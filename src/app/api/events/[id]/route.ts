import { NextRequest } from "next/server";
import { generateEvents } from "@/app/lib/mocks/event";

export async function GET(request: NextRequest) {
  let events = await generateEvents(1);

  return Response.json(events);
}
