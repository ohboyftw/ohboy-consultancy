import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

const SLOT_DURATION_MINUTES = 60;

// Default availability when Supabase is not configured (Sun-Thu 9-17)
const DEFAULT_RULES: Record<number, { start: string; end: string } | null> = {
  0: { start: "09:00", end: "17:00" }, // Sunday
  1: { start: "09:00", end: "17:00" }, // Monday
  2: { start: "09:00", end: "17:00" }, // Tuesday
  3: { start: "09:00", end: "17:00" }, // Wednesday
  4: { start: "09:00", end: "17:00" }, // Thursday
  5: null, // Friday (off)
  6: null, // Saturday (off)
};

/** Parse "HH:MM" to minutes since midnight */
function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Convert minutes since midnight to "HH:MM" */
function fromMinutes(mins: number): string {
  const h = Math.floor(mins / 60).toString().padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Get day of week from YYYY-MM-DD string without timezone issues */
function getDayOfWeek(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  // Use UTC to avoid timezone shifting the date
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");

  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json(
      { error: "Invalid date format. Use YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const dayOfWeek = getDayOfWeek(dateStr);

  const supabase = getSupabaseClient();

  let rules: { start_time: string; end_time: string }[] = [];
  let bookedSlots: { start_time: string; end_time: string }[] = [];
  let blockedSlots: {
    start_time: string | null;
    end_time: string | null;
  }[] = [];

  if (supabase) {
    const { data: rulesData } = await supabase
      .from("availability_rules")
      .select("start_time, end_time")
      .eq("day_of_week", dayOfWeek)
      .eq("is_active", true);

    rules = (rulesData ?? []).map((r) => ({
      start_time: r.start_time.slice(0, 5),
      end_time: r.end_time.slice(0, 5),
    }));

    const { data: bookingsData } = await supabase
      .from("bookings")
      .select("start_time, end_time")
      .eq("date", dateStr)
      .neq("status", "cancelled");

    bookedSlots = (bookingsData ?? []).map((b) => ({
      start_time: b.start_time.slice(0, 5),
      end_time: b.end_time.slice(0, 5),
    }));

    const { data: blockedData } = await supabase
      .from("blocked_slots")
      .select("start_time, end_time")
      .eq("date", dateStr);

    blockedSlots = (blockedData ?? []).map((b) => ({
      start_time: b.start_time?.slice(0, 5) ?? null,
      end_time: b.end_time?.slice(0, 5) ?? null,
    }));
  } else {
    const defaultRule = DEFAULT_RULES[dayOfWeek];
    if (defaultRule) {
      rules = [{ start_time: defaultRule.start, end_time: defaultRule.end }];
    }
  }

  if (rules.length === 0) {
    return NextResponse.json({ slots: [], date: dateStr });
  }

  // Generate time slots using pure string/number math — no Date timezone issues
  const slots: { start: string; end: string; available: boolean }[] = [];

  // Current time as UTC ISO for past-check
  const nowUTC = new Date().toISOString();

  for (const rule of rules) {
    let currentMins = toMinutes(rule.start_time);
    const endMins = toMinutes(rule.end_time);

    while (currentMins + SLOT_DURATION_MINUTES <= endMins) {
      const slotStartStr = fromMinutes(currentMins);
      const slotEndStr = fromMinutes(currentMins + SLOT_DURATION_MINUTES);

      const slotStartISO = `${dateStr}T${slotStartStr}:00Z`;
      const slotEndISO = `${dateStr}T${slotEndStr}:00Z`;

      const isBooked = bookedSlots.some(
        (b) => b.start_time === slotStartStr
      );

      const isBlocked = blockedSlots.some((b) => {
        if (!b.start_time) return true; // full day block
        return b.start_time <= slotStartStr && b.end_time! >= slotEndStr;
      });

      const isPast = slotStartISO < nowUTC;

      slots.push({
        start: slotStartISO,
        end: slotEndISO,
        available: !isBooked && !isBlocked && !isPast,
      });

      currentMins += SLOT_DURATION_MINUTES;
    }
  }

  return NextResponse.json({ slots, date: dateStr });
}
