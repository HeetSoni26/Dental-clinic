import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { service, doctor, date, time, name, phone, email, notes } = body;

    console.log("[SmileCraft Booking]", {
      service, doctor, date, time, name, phone, email, notes,
      timestamp: new Date().toISOString(),
    });

    // Optionally send confirmation email via Resend
    if (process.env.RESEND_API_KEY && email) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "SmileCraft <noreply@smilecraft.com>",
            to: [email],
            subject: "Your SmileCraft Appointment is Confirmed",
            html: `<h2>Appointment Confirmed</h2><p>Hi ${name},</p><p>Your appointment has been confirmed:</p><ul><li><b>Service:</b> ${service}</li><li><b>Doctor:</b> ${doctor}</li><li><b>Date:</b> ${date}</li><li><b>Time:</b> ${time}</li></ul><p>We look forward to seeing you!</p>`,
          }),
        });
      } catch (e) {
        console.warn("Resend not configured:", e);
      }
    }

    return NextResponse.json({ success: true, bookingId: `SC-${Date.now()}` });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 });
  }
}
