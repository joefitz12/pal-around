import { faker } from "@faker-js/faker";

export async function generateAllergyIntolerances(palIds: Pal["id"][]) {
  let allergyIntolerances: AllergyIntolerance[] = [];

  for (let i = 0; i < palIds.length; i++) {
    if (Math.random() * 2 >= 1) {
      continue;
    }
    for (let j = 0; j < Math.random() * 3 + 1; j++) {
      allergyIntolerances.push({
        id: faker.string.uuid(),
        palId: palIds[i],
        name: faker.food.ingredient(),
        description: faker.food.description(),
        severity: ["severe", "mild"][Math.floor(Math.random() * 2)] as
          | "severe"
          | "mild",
      });
    }
  }

  return { allergyIntolerances };
}
