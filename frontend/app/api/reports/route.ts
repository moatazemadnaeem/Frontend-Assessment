import { NextResponse } from "next/server";
import { getReportsFromBackend } from "@/lib/backendApi";

export async function GET() {
  try {
    const reports = await getReportsFromBackend();
    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to fetch reports." } },
      { status: 500 }
    );
  }
}
