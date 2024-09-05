import { generateSelf } from "@/app/lib/mocks/self";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let self = await generateSelf();

  return Response.json(self);
}
