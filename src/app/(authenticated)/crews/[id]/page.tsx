"use client";

import { useHeaderContext } from "@/app/ui/Header/useHeaderContext";
import { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { PalList } from "@/app/ui/PalList";
import { FoodMatrix } from "@/app/ui/FoodMatrix";
import { DrugsAlcoholMatrix } from "@/app/ui/DrugsAlcoholMatrix/DrugsAlcoholMatrix";
// import { TablePalProfile } from "@/app/ui/TablePalProfile";
import { CrewCalendar } from "@/app/ui/CrewCalendar";
import { OverviewPalList } from "@/app/ui/OverviewPalList";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { OverviewCalendar } from "@/app/ui/OverviewCalendar";
import { OverviewEventList } from "@/app/ui/OverviewEventList";

export default function Page() {
  const { dispatch } = useHeaderContext();
  const { id } = useParams();
  const [crew, setCrew] = useState<{ name: string }>();

  useEffect(() => {
    dispatch({
      type: "SET_HEADER",
      payload: {
        message: (
          <div className="flex gap-2 items-center w-full">
            <h1 className="text-3xl font-semibold">{crew?.name}</h1>
            <Link
              href={`sms://open?addresses=${pals
                .map((pal) => pal?.phone)
                .join(",")}`}
              className="flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faMessage} />
            </Link>
          </div>
        ),
      },
    });
  }, [crew, dispatch]);

  useEffect(() => {
    fetch(`/api/crews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.crews) {
          setCrew(data.crews[0]);
        }
      });
  }, [setCrew]);

  const navId = useId();
  const [activePage, setActivePage] = useState<
    "overview" | "pals" | "trips" | "calendar" | "food" | "drugs&alcohol"
  >("overview");

  const [pals, setPals] = useState<Pal[]>([]);

  useEffect(() => {
    fetch(`/api/crews/${id}/pals`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.pals) {
          setPals(data.pals);
        }
      });
  }, [setPals]);

  const [events, setEvents] = useState<PalEvent[]>([]);

  useEffect(() => {
    fetch(`/api/crews/${id}/events`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.events) {
          console.log({ events: data.events });
          setEvents(data.events);
        }
      });
  }, [setEvents]);

  return (
    <div className="flex flex-col gap-4">
      <nav id={navId} className="flex flex-wrap gap-4 gap-y-1">
        <button
          className={clsx(activePage === "overview" && "font-semibold")}
          onClick={() => setActivePage("overview")}
        >
          Overview
        </button>
        <button
          className={clsx(activePage === "pals" && "font-semibold")}
          onClick={() => setActivePage("pals")}
        >
          Pals
        </button>
        <button
          className={clsx(activePage === "trips" && "font-semibold")}
          onClick={() => setActivePage("trips")}
        >
          Trips
        </button>
        <button
          className={clsx(activePage === "food" && "font-semibold")}
          onClick={() => setActivePage("food")}
        >
          Food
        </button>
        <button
          className={clsx(activePage === "drugs&alcohol" && "font-semibold")}
          onClick={() => setActivePage("drugs&alcohol")}
        >
          Drugs & Alcohol
        </button>
        <button
          className={clsx(activePage === "calendar" && "font-semibold")}
          onClick={() => setActivePage("calendar")}
        >
          Calendar
        </button>
      </nav>
      <section className="flex gap-4 w-full md:w-auto">
        {activePage === "overview" && (
          <div className="flex gap-4 items-start w-full">
            <OverviewEventList events={events} />
            <OverviewCalendar pals={pals} events={events} />
            <OverviewPalList pals={pals} />
          </div>
        )}
        {activePage === "calendar" && (
          <CrewCalendar pals={pals} events={events} />
        )}
        {activePage === "drugs&alcohol" && <DrugsAlcoholMatrix pals={pals} />}
        {activePage === "food" && <FoodMatrix pals={pals} />}
        {activePage === "pals" && <PalList pals={pals} />}
      </section>
    </div>
  );
}
