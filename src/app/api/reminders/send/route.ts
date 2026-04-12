import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Reminder stub — would integrate Twilio here
  const body = await req.json();
  console.log("[Reminder]", body);
  return NextResponse.json({ success: true });
}
