import { DateTime } from "luxon";

interface Props {
  event: PalEvent;
}

export function OverviewEvent({ event }: Props) {
  return (
    <tr key={event.id}>
      <td>{event.title}</td>
      <td>{DateTime.fromISO(event.date).toFormat("LLL d")}</td>
    </tr>
  );
}
