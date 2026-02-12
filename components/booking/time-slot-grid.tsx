"use client";

import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Clock, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { TimeSlot } from "@/types/booking";
import { getUserTimezone } from "@/lib/booking-utils";

interface TimeSlotGridProps {
  date: Date;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export function TimeSlotGrid({
  date,
  selectedSlot,
  onSelectSlot,
}: TimeSlotGridProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timezone = getUserTimezone();

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      setError(null);

      const dateStr = format(date, "yyyy-MM-dd");
      try {
        const res = await fetch(`/api/availability?date=${dateStr}`);
        if (!res.ok) throw new Error("Failed to fetch availability");

        const data = await res.json();

        const mapped: TimeSlot[] = data.slots.map(
          (s: { start: string; end: string; available: boolean }) => {
            const startZoned = toZonedTime(parseISO(s.start), timezone);
            const endZoned = toZonedTime(parseISO(s.end), timezone);
            return {
              start: s.start,
              end: s.end,
              startLocal: format(startZoned, "h:mm a"),
              endLocal: format(endZoned, "h:mm a"),
              available: s.available,
            };
          }
        );

        setSlots(mapped);
      } catch {
        setError("Could not load available times. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchSlots();
  }, [date, timezone]);

  const availableSlots = slots.filter((s) => s.available);

  if (loading) {
    return (
      <BlurFade delay={0.1}>
        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <Loader2 size={24} className="animate-spin mb-3" />
          <span className="text-sm font-mono">Loading available times...</span>
        </div>
      </BlurFade>
    );
  }

  if (error) {
    return (
      <BlurFade delay={0.1}>
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      </BlurFade>
    );
  }

  if (availableSlots.length === 0) {
    return (
      <BlurFade delay={0.1}>
        <div className="text-center py-12">
          <Clock size={32} className="mx-auto text-slate-600 mb-3" />
          <p className="text-slate-400 text-sm">
            No available slots on this day.
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Please select a different date.
          </p>
        </div>
      </BlurFade>
    );
  }

  return (
    <BlurFade delay={0.1}>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} className="text-emerald-500" />
          <span className="text-xs font-mono text-slate-500">
            {timezone} &bull; 60-minute sessions
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {availableSlots.map((slot, i) => {
            const isSelected = selectedSlot?.start === slot.start;
            return (
              <Button
                key={slot.start}
                variant="outline"
                onClick={() => onSelectSlot(slot)}
                className={`h-auto py-3 px-4 flex flex-col items-center gap-0.5 transition-all ${
                  isSelected
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 hover:bg-emerald-500/30 hover:border-emerald-400 hover:text-emerald-300"
                    : "border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800"
                }`}
              >
                <span className="text-sm font-medium">{slot.startLocal}</span>
                <span className="text-[10px] text-slate-500">
                  to {slot.endLocal}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </BlurFade>
  );
}
