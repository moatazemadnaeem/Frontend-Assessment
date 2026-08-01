import { NextResponse } from "next/server";
import { BACKEND_BASE_URL } from "@/lib/constants";

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/tasks`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const { data: tasks } = await response.json();
    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to fetch tasks." } },
      { status: 500 }
    );
  }
}
