import { faker } from "@faker-js/faker";

export async function generateSelf() {
  return {
    id: faker.string.uuid(),
    name: [faker.person.firstName(), faker.person.lastName()].join(" "),
  };
}
