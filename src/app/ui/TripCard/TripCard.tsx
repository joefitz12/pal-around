import "./index.css";

export function TripCard() {
  return (
    <div className="basis-full md:basis-60 grid gap-4 border border-[rgb(var(--foreground-rgb))] rounded-lg p-3">
      <div className="flex font-semibold -mx-3 pl-3">
        <span className="flex items-center justify-center rounded-full w-12 h-12 border border-[rgb(var(--foreground-rgb))] text-2xl">
          CF
        </span>
        <span className="grow border-b flex items-center px-3 text-xl">
          Core Four
        </span>
      </div>
      <div className="flex font-semibold -mx-3 px-3">Pals</div>
      <div className="flex font-semibold -mx-3 px-3">Upcoming Trips</div>
    </div>
  );
}
