"use client";

import { useHeaderContext } from "@/app/ui/Header/useHeaderContext";
import { useEffect, useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { PalList } from "@/app/ui/PalList";
import { FoodMatrix } from "@/app/ui/FoodMatrix";
import { DrugsAlcoholMatrix } from "@/app/ui/DrugsAlcoholMatrix/DrugsAlcoholMatrix";
import { TablePalProfile } from "@/app/ui/TablePalProfile";

export default function Page() {
  const { dispatch } = useHeaderContext();
  const { id } = useParams();
  const [crew, setCrew] = useState<{ name: string }>();

  useEffect(() => {
    dispatch({
      type: "SET_HEADER",
      payload: {
        message: crew?.name,
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
    "overview" | "pals" | "events" | "trips" | "food" | "drugs&alcohol"
  >("pals");

  const [pals, setPals] = useState<Pal[]>([]);

  useEffect(() => {
    fetch(`/api/crews/${id}/pals`)
      .then((res) => res.json())
      .then((data) => {
        if (data.pals) {
          console.log({ pals: data.pals });
          setPals(data.pals);
        }
      });
  }, [setPals]);

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
          className={clsx(activePage === "events" && "font-semibold")}
          onClick={() => setActivePage("events")}
        >
          Events
        </button>
        <button
          className={clsx(activePage === "trips" && "font-semibold")}
          onClick={() => setActivePage("trips")}
        >
          Trips
        </button>
      </nav>
      <section className="flex gap-4 w-full md:w-auto">
        {/* {activePage === "account" && (
          <form className="flex flex-col gap-3 basis-full md:basis-60">
            <div className="flex flex-col gap-1">
              <label>Name</label>
              <input
                className="py-1 px-2"
                type="text"
                defaultValue={self?.name}
              />
            </div>
          </form>
        )} */}
        {activePage === "overview" && (
          <div className="flex">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">Pals</h3>
              <ol className="flex flex-col gap-1">
                {pals.map((pal) => (
                  <li className="flex gap-1">
                    <Link href={`/pals/${pal.id}`}>
                      <TablePalProfile pal={pal} displayLastName={false} />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
        {activePage === "drugs&alcohol" && <DrugsAlcoholMatrix pals={pals} />}
        {activePage === "food" && <FoodMatrix pals={pals} />}
        {activePage === "pals" && <PalList pals={pals} />}
      </section>
    </div>
  );
}
