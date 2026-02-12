"use client";

import { CheckCircle2, Calendar, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { Booking } from "@/types/booking";
import { formatBookingDate, downloadICS, utcToLocal } from "@/lib/booking-utils";
import Link from "next/link";

interface ConfirmationScreenProps {
  booking: Booking;
}

export function ConfirmationScreen({ booking }: ConfirmationScreenProps) {
  const displayDate = formatBookingDate(booking.date);
  const displayStart = utcToLocal(
    booking.date,
    booking.start_time,
    booking.timezone
  );
  const displayEnd = utcToLocal(
    booking.date,
    booking.end_time,
    booking.timezone
  );

  return (
    <BlurFade delay={0.1}>
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-emerald-400" />
        </div>

        <h2 className="font-display text-2xl font-bold text-white mb-2">
          Session Booked!
        </h2>
        <p className="text-slate-400 text-sm mb-8">
          A confirmation has been sent to{" "}
          <span className="text-emerald-400">{booking.client_email}</span>
        </p>

        <Card className="bg-slate-900/50 border-slate-800 p-6 text-left mb-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar size={16} className="text-emerald-500 mt-0.5" />
              <div>
                <div className="text-sm font-mono text-slate-500">Date</div>
                <div className="text-white">{displayDate}</div>
              </div>
            </div>

            <div className="border-t border-slate-800" />

            <div className="flex items-start gap-3">
              <div className="w-4" />
              <div>
                <div className="text-sm font-mono text-slate-500">Time</div>
                <div className="text-white">
                  {displayStart} &ndash; {displayEnd}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {booking.timezone}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800" />

            <div className="flex items-start gap-3">
              <div className="w-4" />
              <div>
                <div className="text-sm font-mono text-slate-500">Type</div>
                <div className="text-white">Discovery Session (60 min)</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            size="lg"
            className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            onClick={() => downloadICS(booking)}
          >
            <Download size={16} className="mr-2" />
            Add to Calendar (.ics)
          </Button>

          <Button variant="gradient" size="lg" className="w-full" asChild>
            <Link href="/" className="flex items-center gap-2">
              Back to Home
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </BlurFade>
  );
}
