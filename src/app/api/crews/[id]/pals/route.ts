import { generatePals } from "@/app/lib/mocks/pal";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let pals = await generatePals(10);

  return Response.json(pals);
}
