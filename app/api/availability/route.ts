import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { format, parseISO, addMinutes } from "date-fns";

const SLOT_DURATION_MINUTES = 60;

// Default availability when Supabase is not configured (Sun-Thu 9-17 Dubai time)
const DEFAULT_RULES: Record<number, { start: string; end: string } | null> = {
  0: { start: "09:00", end: "17:00" }, // Sunday
  1: { start: "09:00", end: "17:00" }, // Monday
  2: { start: "09:00", end: "17:00" }, // Tuesday
  3: { start: "09:00", end: "17:00" }, // Wednesday
  4: { start: "09:00", end: "17:00" }, // Thursday
  5: null, // Friday (off)
  6: null, // Saturday (off)
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");

  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json(
      { error: "Invalid date format. Use YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const date = parseISO(dateStr);
  const dayOfWeek = date.getDay();

  const supabase = getSupabaseClient();

  let rules: { start_time: string; end_time: string }[] = [];
  let bookedSlots: { start_time: string; end_time: string }[] = [];
  let blockedSlots: {
    start_time: string | null;
    end_time: string | null;
  }[] = [];

  if (supabase) {
    // Fetch availability rules for this day of week
    const { data: rulesData } = await supabase
      .from("availability_rules")
      .select("start_time, end_time")
      .eq("day_of_week", dayOfWeek)
      .eq("is_active", true);

    rules = (rulesData ?? []).map((r) => ({
      start_time: r.start_time.slice(0, 5),
      end_time: r.end_time.slice(0, 5),
    }));

    // Fetch existing bookings for this date
    const { data: bookingsData } = await supabase
      .from("bookings")
      .select("start_time, end_time")
      .eq("date", dateStr)
      .neq("status", "cancelled");

    bookedSlots = (bookingsData ?? []).map((b) => ({
      start_time: b.start_time.slice(0, 5),
      end_time: b.end_time.slice(0, 5),
    }));

    // Fetch blocked slots for this date
    const { data: blockedData } = await supabase
      .from("blocked_slots")
      .select("start_time, end_time")
      .eq("date", dateStr);

    blockedSlots = (blockedData ?? []).map((b) => ({
      start_time: b.start_time?.slice(0, 5) ?? null,
      end_time: b.end_time?.slice(0, 5) ?? null,
    }));
  } else {
    // Use default rules when Supabase is not configured
    const defaultRule = DEFAULT_RULES[dayOfWeek];
    if (defaultRule) {
      rules = [{ start_time: defaultRule.start, end_time: defaultRule.end }];
    }
  }

  // No rules = day is off
  if (rules.length === 0) {
    return NextResponse.json({ slots: [], date: dateStr });
  }

  // Generate time slots
  const slots: { start: string; end: string; available: boolean }[] = [];

  for (const rule of rules) {
    const [startH, startM] = rule.start_time.split(":").map(Number);
    const [endH, endM] = rule.end_time.split(":").map(Number);

    let current = new Date(date);
    current.setUTCHours(startH, startM, 0, 0);

    const endTime = new Date(date);
    endTime.setUTCHours(endH, endM, 0, 0);

    while (current < endTime) {
      const slotEnd = addMinutes(current, SLOT_DURATION_MINUTES);
      if (slotEnd > endTime) break;

      const slotStartStr = format(current, "HH:mm");
      const slotEndStr = format(slotEnd, "HH:mm");

      // Check if slot is booked
      const isBooked = bookedSlots.some(
        (b) => b.start_time === slotStartStr
      );

      // Check if slot is blocked
      const isBlocked = blockedSlots.some((b) => {
        if (!b.start_time) return true; // full day block
        return b.start_time <= slotStartStr && b.end_time! >= slotEndStr;
      });

      // Check if slot is in the past
      const now = new Date();
      const isPast = current < now;

      slots.push({
        start: `${dateStr}T${slotStartStr}:00Z`,
        end: `${dateStr}T${slotEndStr}:00Z`,
        available: !isBooked && !isBlocked && !isPast,
      });

      current = slotEnd;
    }
  }

  return NextResponse.json({ slots, date: dateStr });
}
