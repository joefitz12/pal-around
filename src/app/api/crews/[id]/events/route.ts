import { generateEvents } from "@/app/lib/mocks/event";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let events = await generateEvents(10);

  return Response.json(events);
}
