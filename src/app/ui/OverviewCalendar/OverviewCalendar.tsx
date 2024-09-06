import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "./react-calendar.scss";

interface Props {
  pals: Pal[];
}

export function OverviewCalendar({ pals }: Props) {
  console.log({ pals });

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
      .map((pal) => pal.name.first);
    return birthdays.length > 0 ? (
      <FontAwesomeIcon
        icon={faBirthdayCake}
        title={`${birthdays.join(", ")}'s Birthday${
          birthdays.length > 1 ? "'s" : ""
        }`}
      />
    ) : null;
  }

  function tileClassName({
    date,
    view,
  }: {
    date: Date;
    view: "month" | "year" | "decade" | "century";
  }) {
    // console.log({ date, view });
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
      className="border rounded-lg max-w-96"
      tileContent={tileContent}
      tileClassName={tileClassName}
    />
  );
}
