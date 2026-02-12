import { NextRequest, NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await sendContactNotification({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact notification:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
