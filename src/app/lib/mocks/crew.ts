import { faker } from "@faker-js/faker";

export async function generateCrews(count: 1 | 10 | 25) {
  let crews = [];

  for (let i = 0; i < count; i++) {
    crews.push({
      id: faker.string.uuid(),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
    });
  }

  return { crews };
}

export async function generateCrewsWithPreviews(count: 1 | 10 | 25) {
  let crews = [];
  let pals = [];

  for (let i = 0; i < 9; i++) {
    pals.push({
      id: faker.string.uuid(),
      name: {
        first: faker.person.firstName(),
        last: faker.person.lastName(),
      },
      photo: faker.image.avatar(),
      phone: faker.phone.number({ style: "international" }),
    });
  }

  for (let i = 0; i < count; i++) {
    crews.push({
      id: faker.string.uuid(),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      pals,
    });
  }

  return { crews };
}
