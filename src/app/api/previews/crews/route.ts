import { generateCrews, generateCrewsWithPreviews } from "@/app/lib/mocks/crew";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let crews = await generateCrewsWithPreviews(25);

  return Response.json(crews);
}
