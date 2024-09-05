import { generateCrews } from "@/app/lib/mocks/crew";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let crews = await generateCrews(1);

  return Response.json(crews);
}
