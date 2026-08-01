import { NextResponse } from "next/server";
import { BACKEND_BASE_URL } from "@/lib/constants";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const payload = (await request.json()) as { completed?: boolean };

    if (typeof payload.completed !== "boolean") {
      return NextResponse.json(
        { error: { message: "completed must be boolean" } },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_BASE_URL}/tasks/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const { data: task } = await response.json();
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to update task." } },
      { status: 500 }
    );
  }
}
