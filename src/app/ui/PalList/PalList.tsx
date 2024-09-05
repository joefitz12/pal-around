import { PalCard } from "@/app/ui/PalCard";

interface Props {
  pals: Pal[];
}

export function PalList({ pals }: Props) {
  return (
    <section className="flex gap-4 flex-wrap py-4">
      {pals.map((pal) => (
        <PalCard key={pal.id} {...pal} />
      ))}
    </section>
  );
}
