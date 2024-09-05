import { generateAllergyIntolerances } from "@/app/lib/mocks/allergyIntolerance";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: { ids: string } }
) {
  let ids = context.params.ids;
  let allergyIntolerances = await generateAllergyIntolerances(ids.split(","));

  return Response.json(allergyIntolerances);
}
