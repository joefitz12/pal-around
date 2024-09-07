import { DateTime } from "luxon";
import { OverviewEvent } from "../OverviewEvent";

interface Props {
  events: PalEvent[];
}

export function OverviewEventList({ events }: Props) {
  return (
    <div className="w-30 grid gap-2 border border-[rgb(var(--foreground-rgb))] rounded-lg p-3 relative">
      <h3>{`${DateTime.now().toFormat("LLLL")} Events`}</h3>
      <table>
        <thead className="h-0 overflow-hidden text-[0px] opacity-0">
          <th>Title</th>
          <th>Date</th>
        </thead>
        <tbody>
          {events.map((event) => (
            <OverviewEvent event={event} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
