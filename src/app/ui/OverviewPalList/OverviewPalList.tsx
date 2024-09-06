import { OverviewPalCard } from "../OverviewPalCard";

interface Props {
  pals: Pal[];
  displayCrews?: boolean;
  displayTrips?: boolean;
}

export function OverviewPalList({ pals, displayCrews, displayTrips }: Props) {
  return (
    <section className="flex flex-col gap-[inherit] justify-start">
      {pals.map((pal) => (
        <OverviewPalCard key={pal.id} {...pal} />
      ))}
    </section>
  );
}
