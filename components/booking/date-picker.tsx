"use client";

import { Calendar } from "@/components/ui/calendar";
import { BlurFade } from "@/components/magicui/blur-fade";
import { addDays, isBefore, startOfDay } from "date-fns";

interface DatePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

// Disable past dates and dates more than 60 days out
const today = startOfDay(new Date());
const maxDate = addDays(today, 60);

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  return (
    <BlurFade delay={0.1}>
      <div className="flex flex-col items-center">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            disabled={(date) =>
              isBefore(date, today) || date > maxDate
            }
            className="rounded-xl"
          />
        </div>
        <p className="text-xs text-slate-500 font-mono mt-4">
          Select a date to see available time slots
        </p>
      </div>
    </BlurFade>
  );
}
