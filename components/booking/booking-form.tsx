"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { BookingFormData } from "@/types/booking";

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => Promise<void>;
  submitting: boolean;
}

export function BookingForm({ onSubmit, submitting }: BookingFormProps) {
  const [formState, setFormState] = useState<BookingFormData>({
    name: "",
    email: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formState);
  };

  return (
    <BlurFade delay={0.1}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="booking-name"
            className="text-sm font-mono text-slate-400"
          >
            Name
          </label>
          <Input
            id="booking-name"
            type="text"
            value={formState.name}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
            placeholder="Your name"
            required
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="booking-email"
            className="text-sm font-mono text-slate-400"
          >
            Email
          </label>
          <Input
            id="booking-email"
            type="email"
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            placeholder="you@company.com"
            required
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="booking-description"
            className="text-sm font-mono text-slate-400"
          >
            What would you like to discuss?
          </label>
          <Textarea
            id="booking-description"
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            placeholder="Brief description of your project or challenge..."
            disabled={submitting}
          />
        </div>

        <Button
          type="submit"
          variant="gradient"
          size="xl"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Booking...
            </>
          ) : (
            <>
              <Send size={18} className="mr-2" />
              Confirm Booking
            </>
          )}
        </Button>
      </form>
    </BlurFade>
  );
}
