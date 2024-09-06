import { PalCard } from "@/app/ui/PalCard";

interface Props {
  pals: Pal[];
  displayCrews?: boolean;
  displayTrips?: boolean;
}

export function PalList({ pals, displayCrews, displayTrips }: Props) {
  return (
    <section className="flex gap-4 flex-wrap py-4">
      {pals.map((pal) => (
        <PalCard
          displayCrews={displayCrews}
          displayTrips={displayTrips}
          key={pal.id}
          {...pal}
        />
      ))}
    </section>
  );
}
