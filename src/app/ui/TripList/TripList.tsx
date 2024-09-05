// import Image from "next/image";

import { TripCard } from "../TripCard";

export function TripList() {
  return (
    <section className="flex gap-4 flex-wrap py-4">
      <TripCard />
      <TripCard />
      <TripCard />
    </section>
  );
}
