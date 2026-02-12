import { format, parseISO } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";
import type { Booking } from "@/types/booking";

/**
 * Convert a UTC time string to the user's local timezone for display.
 */
export function utcToLocal(
  date: string,
  time: string,
  timezone: string
): string {
  const utcDate = parseISO(`${date}T${time}:00Z`);
  const zonedDate = toZonedTime(utcDate, timezone);
  return format(zonedDate, "h:mm a");
}

/**
 * Convert a local time to UTC for storage.
 */
export function localToUtc(
  date: string,
  time: string,
  timezone: string
): string {
  const localDate = parseISO(`${date}T${time}:00`);
  const utcDate = fromZonedTime(localDate, timezone);
  return format(utcDate, "HH:mm");
}

/**
 * Get the user's IANA timezone string.
 */
export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Format a date for display.
 */
export function formatBookingDate(dateStr: string): string {
  return format(parseISO(dateStr), "EEEE, MMMM d, yyyy");
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
