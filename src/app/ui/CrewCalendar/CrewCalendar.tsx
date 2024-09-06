import Calendar from "react-calendar";
import "./react-calendar.scss";

interface Props {
  pals: Pal[];
}

export function CrewCalendar({ pals }: Props) {
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
      className="border rounded-lg grow"
      tileContent={tileContent}
      tileClassName={tileClassName}
    />
  );
}
