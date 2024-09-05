import { CrewCard } from "@/app/ui/CrewCard";

interface Props {
  crews: any[];
}

export function CrewList({ crews }: Props) {
  return (
    <section className="flex gap-4 flex-wrap py-4">
      {crews.map((crew) => (
        <CrewCard key={crew.id} {...crew} />
      ))}
    </section>
  );
}
