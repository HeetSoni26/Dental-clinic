import { NextResponse } from "next/server";

const doctors = [
  { id: "sarah-mitchell", name: "Dr. Sarah Mitchell", role: "Founder & Lead Cosmetic Surgeon", available: true },
  { id: "james-chen", name: "Dr. James Chen", role: "Master Implantologist", available: true },
];

export async function GET() {
  return NextResponse.json({ doctors });
}
