import { NextResponse } from "next/server";

export async function GET() {
  const records = [
    { id: "1", name: "Dental X-Ray — Oct 2024", type: "X-Ray", size: "2.4 MB", date: "2024-10-01" },
    { id: "2", name: "Treatment Plan", type: "Document", size: "0.8 MB", date: "2024-10-01" },
  ];
  return NextResponse.json({ records });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[Portal Upload]", body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
