import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, type, notes } = body;

    // Log to console (in production, wire to DB or Resend here)
    console.log("[SmileCraft Contact]", {
      type: type || "contact",
      name, email, phone, service, message, notes,
      timestamp: new Date().toISOString(),
    });

    // Attempt to send via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "SmileCraft <noreply@smilecraft.com>",
            to: [process.env.ADMIN_EMAIL || "admin@smilecraft.com"],
            subject: `${type === "emergency" ? "🚨 EMERGENCY" : "New Lead"}: ${name}`,
            html: `<p><b>Name:</b> ${name}</p><p><b>Phone:</b> ${phone}</p><p><b>Email:</b> ${email || "N/A"}</p><p><b>Service:</b> ${service || "N/A"}</p><p><b>Message:</b> ${message || notes || "N/A"}</p><p><b>Type:</b> ${type || "contact"}</p>`,
          }),
        });
      } catch (e) {
        console.warn("Resend not configured:", e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
