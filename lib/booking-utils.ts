import type { Booking } from "@/types/booking";

/**
 * Format a UTC ISO time string to the user's local timezone for display.
 * e.g. "2026-02-15", "09:00" -> "1:00 PM" (in Asia/Dubai)
 */
export function utcToLocal(date: string, time: string, timezone: string): string {
  const utcDate = new Date(`${date}T${time}:00Z`);
  return utcDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  });
}

/**
 * Get the user's IANA timezone string.
 */
export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Format a date string for display.
 * e.g. "2026-02-15" -> "Sunday, February 15, 2026"
 */
export function formatBookingDate(dateStr: string): string {
  // Parse as UTC to avoid date shifting
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Generate an ICS calendar file for a confirmed booking.
 */
export function generateICS(booking: Booking): string {
  const startDt = `${booking.date.replace(/-/g, "")}T${booking.start_time.replace(":", "")}00Z`;
  const endDt = `${booking.date.replace(/-/g, "")}T${booking.end_time.replace(":", "")}00Z`;
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ohboy Consultancy//Booking//EN",
    "BEGIN:VEVENT",
    `DTSTART:${startDt}`,
    `DTEND:${endDt}`,
    `DTSTAMP:${now}`,
    `UID:${booking.id}@ohboyconsultancy.com`,
    `SUMMARY:Discovery Session - ${booking.client_name}`,
    `DESCRIPTION:${booking.description || "Discovery session with Ohboy Consultancy"}`,
    "ORGANIZER:mailto:aravind@ohboyconsultancy.com",
    `ATTENDEE:mailto:${booking.client_email}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Download an ICS file in the browser.
 */
export function downloadICS(booking: Booking): void {
  const icsContent = generateICS(booking);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ohboy-discovery-session.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
