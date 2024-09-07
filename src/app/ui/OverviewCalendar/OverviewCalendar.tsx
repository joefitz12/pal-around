import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faCircle } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "./react-calendar.scss";

interface Props {
  pals: Pal[];
  events: PalEvent[];
}

export function OverviewCalendar({ events, pals }: Props) {
  function tileClassName({
    date,
    view,
  }: {
    date: Date;
    view: "month" | "year" | "decade" | "century";
  }) {
    const classNames = [];
    const today = new Date();

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
    if (birthdays.length > 0) {
      classNames.push("birthday");
    }

    // add 'current' class
    if (
      today.getFullYear() > date.getFullYear() ||
      (today.getFullYear() >= date.getFullYear() &&
        today.getMonth() > date.getMonth()) ||
      (today.getFullYear() >= date.getFullYear() &&
        today.getMonth() >= date.getMonth() &&
        today.getDate() > date.getDate())
    ) {
      classNames.push("past");
    }

    return classNames.join(" ");
  }

  return (
    <Calendar
      className="overview border rounded-lg max-w-96"
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

  const events = _events
    .filter((event) => {
      const eventDate = new Date(event.date);
      if (["month", "week"].includes(view)) {
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth()
        );
      }
    })
    .map((event) => event.title);

  return (
    <>
      {events.length > 0 && (
        <FontAwesomeIcon
          className="w-2 h-2"
          icon={faCircle}
          title={`${events.join(", ")}`}
        />
      )}
      {birthdays.length > 0 && (
        <FontAwesomeIcon
          icon={faBirthdayCake}
          title={`${birthdays.join(", ")}'s Birthday${
            birthdays.length > 1 ? "'s" : ""
          }`}
        />
      )}
    </>
  );
}
