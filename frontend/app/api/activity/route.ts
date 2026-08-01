import { NextResponse } from "next/server";
import { BACKEND_BASE_URL } from "@/lib/constants";

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/activity`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const logs = await response.json();
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to fetch activity logs." } },
      { status: 500 }
    );
  }
}
