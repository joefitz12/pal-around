import { faker } from "@faker-js/faker";

export async function generatePals(count: 1 | 10 | 25) {
  let pals: Pal[] = [];

  const meatPreferences: Array<Pal["food"]["meat"]> = [
    "yes",
    "no-red-meat",
    "vegetarian",
    "pescatarian",
    "plant-based",
    "vegan",
  ];

  for (let i = 0; i < count; i++) {
    pals.push({
      id: faker.string.uuid(),
      name: {
        first: faker.person.firstName(),
        last: faker.person.lastName(),
      },
      phone: faker.phone.number({ style: "international" }),
      photo: faker.image.avatar(),
      food: {
        meat: meatPreferences[
          Math.floor(meatPreferences.length * Math.random())
        ],
      },
      birthday: faker.date.birthdate(),
      lastModifiedAt: new Date(),
      createdAt: new Date(),
    });
  }

  return { pals };
}
