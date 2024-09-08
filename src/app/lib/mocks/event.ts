import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

export async function generateEvents(count: 1 | 10 | 25) {
  let events: PalEvent[] = [];

  for (let i = 0; i < count; i++) {
    events.push({
      id: faker.string.uuid(),
      title: faker.lorem.words({ min: 1, max: 5 }),
      description: faker.lorem.lines({ min: 1, max: 5 }),
      date: DateTime.now()
        .plus({ days: Math.floor(Math.random() * 60) })
        .toISO(),
      lastModifiedAt: new Date(),
      createdAt: new Date(),
    });
  }

  return {
    events: events.sort((a, b) =>
      a.date < b.date ? -1 : a.date > b.date ? 1 : 0
    ),
  };
}
