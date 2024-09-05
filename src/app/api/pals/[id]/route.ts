import { NextRequest } from "next/server";
import { generatePals } from "@/app/lib/mocks/pal";

export async function GET(request: NextRequest) {
  let pals = await generatePals(1);

  return Response.json(pals);
}
