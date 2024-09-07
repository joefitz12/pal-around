type Pal = {
  id: string;
  name: {
    first: string;
    last: string;
  };
  photo: string;
  food: {
    meat:
      | "yes"
      | "no-red-meat"
      | "vegetarian"
      | "pescatarian"
      | "plant-based"
      | "vegan";
  };
  phone: string;
  birthday: Date;
  createdAt: Date;
  lastModifiedAt: Date;
};

type AllergyIntolerance = {
  id: string;
  palId: string;
  name: string;
  description: string;
  severity: "severe" | "mild";
};

type PalEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt: Date;
  lastModifiedAt: Date;
};

type Attendance = {
  eventId: string;
  accountId: string;
  isAttending?: true | false | "maybe";
};
