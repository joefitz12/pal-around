import { DateTime } from "luxon";
import { OverviewEvent } from "../OverviewEvent";
import { Suspense } from "react";

interface Props {
  events: PalEvent[];
}

export function OverviewEventList({ events }: Props) {
  return (
    <div className="w-30 grid gap-2 border border-[rgb(var(--foreground-rgb))] rounded-lg p-3 relative">
      <h3 className="text-xl font-semibold">{`${DateTime.now().toFormat(
        "LLLL"
      )} Events`}</h3>
      <table>
        <thead className="h-0 overflow-hidden text-[0px] opacity-0">
          <th>Title</th>
          <th>Date</th>
        </thead>
        <tbody>
          <Suspense>
            {events.map((event) => (
              <OverviewEvent key={event.id} event={event} />
            ))}
          </Suspense>
        </tbody>
      </table>
    </div>
  );
}
