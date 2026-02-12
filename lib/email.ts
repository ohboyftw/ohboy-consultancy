import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const FROM = "Ohboy Consultancy <aravind@ohboyconsultancy.com>";
const CONSULTANT_EMAIL = "aravind@ohboyconsultancy.com";

interface BookingEmailData {
  clientName: string;
  clientEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  description?: string;
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  // To client
  await transporter.sendMail({
    from: FROM,
    to: data.clientEmail,
    subject: "Discovery Session Confirmed — Ohboy Consultancy",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #10B981; font-size: 24px; margin-bottom: 8px;">Session Confirmed!</h1>
        <p style="color: #64748B; font-size: 16px; margin-bottom: 32px;">
          Hi ${data.clientName}, your Discovery Session has been booked.
        </p>
        <div style="background: #0F172A; border: 1px solid #1E293B; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <p style="color: #F8FAFC; margin: 0 0 8px;"><strong>Date:</strong> ${data.date}</p>
          <p style="color: #F8FAFC; margin: 0 0 8px;"><strong>Time:</strong> ${data.startTime} – ${data.endTime} (${data.timezone})</p>
          <p style="color: #F8FAFC; margin: 0;"><strong>Duration:</strong> 60 minutes</p>
        </div>
        <p style="color: #64748B; font-size: 14px;">
          I'll send a meeting link closer to the session. Looking forward to our conversation!
        </p>
        <hr style="border: none; border-top: 1px solid #1E293B; margin: 32px 0;" />
        <p style="color: #64748B; font-size: 12px;">
          Ohboy Consultancy FZ LLC · Dubai, UAE<br/>
          aravind@ohboyconsultancy.com
        </p>
      </div>
    `,
  });

  // To consultant
  await transporter.sendMail({
    from: FROM,
    to: CONSULTANT_EMAIL,
    subject: `New Booking: ${data.clientName}`,
    html: `
      <div style="font-family: system-ui, sans-serif; padding: 20px;">
        <h2 style="margin-top: 0;">New Discovery Session Booked</h2>
        <p><strong>Client:</strong> ${data.clientName}</p>
        <p><strong>Email:</strong> ${data.clientEmail}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.startTime} – ${data.endTime} (${data.timezone})</p>
        <p><strong>Description:</strong> ${data.description || "No description provided"}</p>
      </div>
    `,
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
}) {
  await transporter.sendMail({
    from: FROM,
    to: CONSULTANT_EMAIL,
    subject: `New Contact: ${data.name}`,
    html: `
      <div style="font-family: system-ui, sans-serif; padding: 20px;">
        <h2 style="margin-top: 0;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background: #f1f5f9; padding: 16px; border-radius: 8px;">${data.message}</p>
      </div>
    `,
  });
}
