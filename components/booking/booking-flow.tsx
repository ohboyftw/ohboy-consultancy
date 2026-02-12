"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Clock,
  UserCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DatePicker } from "@/components/booking/date-picker";
import { TimeSlotGrid } from "@/components/booking/time-slot-grid";
import { BookingForm } from "@/components/booking/booking-form";
import { ConfirmationScreen } from "@/components/booking/confirmation-screen";
import { getUserTimezone, formatBookingDate } from "@/lib/booking-utils";
import { getSupabaseClient } from "@/lib/supabase";
import type {
  BookingStep,
  TimeSlot,
  BookingFormData,
  Booking,
} from "@/types/booking";

const steps: { key: BookingStep; label: string; icon: typeof Calendar }[] = [
  { key: "date", label: "Date", icon: Calendar },
  { key: "time", label: "Time", icon: Clock },
  { key: "form", label: "Details", icon: UserCircle },
  { key: "confirmation", label: "Confirmed", icon: CheckCircle2 },
];

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("date");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timezone = getUserTimezone();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    if (date) {
      setCurrentStep("time");
    }
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep("form");
  };

  const handleFormSubmit = async (formData: BookingFormData) => {
    if (!selectedDate || !selectedSlot) return;

    setSubmitting(true);
    setError(null);

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const startTime = selectedSlot.start.slice(11, 16); // extract HH:MM from ISO
    const endTime = selectedSlot.end.slice(11, 16);

    const bookingData = {
      date: dateStr,
      start_time: startTime,
      end_time: endTime,
      client_name: formData.name,
      client_email: formData.email,
      description: formData.description,
      timezone,
      status: "confirmed" as const,
    };

    const supabase = getSupabaseClient();

    if (supabase) {
      const { data, error: dbError } = await supabase
        .from("bookings")
        .insert(bookingData)
        .select()
        .single();

      if (dbError) {
        if (dbError.code === "23505") {
          setError("This time slot was just booked by someone else. Please select a different time.");
          setCurrentStep("time");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setSubmitting(false);
        return;
      }

      setConfirmedBooking(data as Booking);
    } else {
      // Fallback: create a local booking object when Supabase isn't configured
      setConfirmedBooking({
        id: crypto.randomUUID(),
        ...bookingData,
        created_at: new Date().toISOString(),
      });
    }

    setSubmitting(false);
    setCurrentStep("confirmation");
  };

  const goBack = () => {
    setError(null);
    if (currentStep === "time") setCurrentStep("date");
    if (currentStep === "form") setCurrentStep("time");
  };

  const stepIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      <BlurFade>
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((step, i) => {
            const isActive = i === stepIndex;
            const isCompleted = i < stepIndex;
            return (
              <div key={step.key} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : isCompleted
                        ? "text-emerald-500/60"
                        : "text-slate-600"
                  }`}
                >
                  <step.icon size={12} />
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 h-px ${
                      isCompleted ? "bg-emerald-500/40" : "bg-slate-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </BlurFade>

      {/* Back Button */}
      {currentStep !== "date" && currentStep !== "confirmation" && (
        <BlurFade>
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            className="mb-4 text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
        </BlurFade>
      )}

      {/* Selection Summary */}
      {currentStep !== "date" && currentStep !== "confirmation" && selectedDate && (
        <BlurFade>
          <div className="mb-6 p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-3 text-sm">
            <Calendar size={14} className="text-emerald-500" />
            <span className="text-slate-300">
              {formatBookingDate(format(selectedDate, "yyyy-MM-dd"))}
            </span>
            {selectedSlot && (
              <>
                <span className="text-slate-600">|</span>
                <Clock size={14} className="text-emerald-500" />
                <span className="text-slate-300">
                  {selectedSlot.startLocal} &ndash; {selectedSlot.endLocal}
                </span>
              </>
            )}
          </div>
        </BlurFade>
      )}

      {/* Error Message */}
      {error && (
        <BlurFade>
          <div className="mb-6 flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            <span>{error}</span>
          </div>
        </BlurFade>
      )}

      {/* Main Content */}
      <Card className="bg-slate-900/30 border-slate-800 p-6 md:p-8">
        {currentStep === "date" && (
          <DatePicker selected={selectedDate} onSelect={handleDateSelect} />
        )}

        {currentStep === "time" && selectedDate && (
          <TimeSlotGrid
            date={selectedDate}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSlotSelect}
          />
        )}

        {currentStep === "form" && (
          <BookingForm onSubmit={handleFormSubmit} submitting={submitting} />
        )}

        {currentStep === "confirmation" && confirmedBooking && (
          <ConfirmationScreen booking={confirmedBooking} />
        )}
      </Card>
    </div>
  );
}
