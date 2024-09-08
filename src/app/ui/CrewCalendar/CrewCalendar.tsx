import Calendar from "react-calendar";
import "./react-calendar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Props {
  pals: Pal[];
  events: PalEvent[];
}

export function CrewCalendar({ events, pals }: Props) {
  function tileContent({
    date,
    view,
  }: {
    date: Date;
    view: "month" | "year" | "decade" | "century";
  }) {
    // console.log({ date, view });
    const birthdays = pals
      .filter((pal) => {
        const birthday = new Date(pal.birthday);
        if (["month", "week"].includes(view)) {
          return (
            birthday.getDate() === date.getDate() &&
            birthday.getMonth() === date.getMonth()
          );
        } else if (view === "year") {
          return birthday.getMonth() === date.getMonth();
        }
      })
      .map((pal) => `${pal.name.first}'s birthday`);
    return birthdays.length > 0 ? (
      <>
        {view === "month" &&
          Array.from(Array(150)).map((_, i) => (
            <span className={`confetti-${i}`} />
          ))}
        <div className="dates flex flex-col">
          {birthdays.map((birthday) => (
            <span>{birthday}</span>
          ))}
        </div>
      </>
    ) : null;
  }

  function tileClassName({
    date,
    view,
  }: {
    date: Date;
    view: "month" | "year" | "decade" | "century";
  }) {
    const birthdays = pals.filter((pal) => {
      const birthday = new Date(pal.birthday);
      if (["month", "week"].includes(view)) {
        return (
          birthday.getDate() === date.getDate() &&
          birthday.getMonth() === date.getMonth()
        );
      } else if (view === "year") {
        return birthday.getMonth() === date.getMonth();
      }
    });
    return birthdays.length > 0 ? "birthday" : "";
  }

  return (
    <Calendar
      className="crew border rounded-lg grow"
      tileContent={({ date, view }) => (
        <TileContent date={date} view={view} pals={pals} events={events} />
      )}
      tileClassName={tileClassName}
    />
  );
}

function TileContent({
  date,
  view,
  events: _events,
  pals,
}: {
  date: Date;
  view: "month" | "year" | "decade" | "century";
  events: PalEvent[];
  pals: Pal[];
}) {
  const birthdays = pals
    .filter((pal) => {
      const birthday = new Date(pal.birthday);
      if (["month", "week"].includes(view)) {
        return (
          birthday.getDate() === date.getDate() &&
          birthday.getMonth() === date.getMonth()
        );
      } else if (view === "year") {
        return birthday.getMonth() === date.getMonth();
      }
    })
    .map((pal) => pal.name.first);

  const events = _events.filter((event) => {
    const eventDate = new Date(event.date);
    if (["month", "week"].includes(view)) {
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth()
      );
    }
  });

  return (
    <>
      {events.length > 0 && (
        <div className="dates flex flex-col">
          {events.map((event) => (
            <Link href={`/events/${event.id}`}>{event.title}</Link>
          ))}
        </div>
      )}
      {birthdays.length > 0 && (
        <>
          <div className="dates flex flex-col">
            {birthdays.map((birthday) => (
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faBirthdayCake} />
                <span>{birthday}</span>
                <FontAwesomeIcon icon={faBirthdayCake} />
              </div>
            ))}
          </div>
          {Array.from(Array(150)).map((_, i) => (
            <span className={`confetti-${i}`} />
          ))}
        </>
      )}
    </>
  );
}
