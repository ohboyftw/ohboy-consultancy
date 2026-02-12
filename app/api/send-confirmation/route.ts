import { NextRequest, NextResponse } from "next/server";
import { sendBookingConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await sendBookingConfirmation({
      clientName: data.client_name,
      clientEmail: data.client_email,
      date: data.date,
      startTime: data.start_time,
      endTime: data.end_time,
      timezone: data.timezone,
      description: data.description,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send booking confirmation:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
