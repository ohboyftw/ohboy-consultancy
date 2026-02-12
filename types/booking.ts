export interface AvailabilityRule {
  id: string;
  day_of_week: number; // 0 = Sunday, 6 = Saturday
  start_time: string; // "09:00"
  end_time: string; // "17:00"
  is_active: boolean;
}

export interface TimeSlot {
  start: string; // ISO string
  end: string; // ISO string
  startLocal: string; // formatted for display e.g. "9:00 AM"
  endLocal: string;
  available: boolean;
}

export interface Booking {
  id: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM (UTC)
  end_time: string; // HH:MM (UTC)
  client_name: string;
  client_email: string;
  description: string;
  status: "pending" | "confirmed" | "cancelled";
  timezone: string;
  created_at: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  description: string;
}

export type BookingStep = "date" | "time" | "form" | "confirmation";

export interface BlockedSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  reason?: string;
}
