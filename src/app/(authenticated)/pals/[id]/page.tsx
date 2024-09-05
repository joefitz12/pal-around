"use client";

import { useHeaderContext } from "@/app/ui/Header/useHeaderContext";
import { useEffect, useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { buildName } from "@/app/lib/utils/buildName";
import { PalList } from "@/app/ui/PalList";
import { CrewList } from "@/app/ui/CrewList";

export default function Page() {
  const { dispatch } = useHeaderContext();
  const { id } = useParams();
  const [pal, setPal] = useState<{
    id: string;
    name: { first: string; last: string };
    photo: string;
  }>();

  useEffect(() => {
    dispatch({
      type: "SET_HEADER",
      payload: {
        message: pal?.name ? buildName(pal?.name) : "",
      },
    });
  }, [pal, dispatch]);

  useEffect(() => {
    fetch(`/api/pals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.pals) {
          setPal(data.pals[0]);
        }
      });
  }, [setPal]);

  const [crews, setCrews] = useState();

  useEffect(() => {
    fetch(`/api/pals/${id}/crews`)
      .then((res) => res.json())
      .then((data) => {
        if (data.crews) {
          setCrews(data.crews);
        }
      });
  }, [setCrews]);

  const navId = useId();
  const [activePage, setActivePage] = useState<
    "info" | "crews" | "trips" | "food" | "drugs&alcohol"
  >("info");

  return (
    <div className="flex flex-col gap-4">
      <nav id={navId} className="flex gap-4">
        <button
          className={clsx(activePage === "info" && "font-semibold")}
          onClick={() => setActivePage("info")}
        >
          Info
        </button>
        <button
          className={clsx(activePage === "crews" && "font-semibold")}
          onClick={() => setActivePage("crews")}
        >
          Crews
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
      </nav>
      <section className="flex gap-4 w-full md:w-auto">
        {activePage === "info" && (
          <form className="flex flex-col gap-3 basis-full md:basis-60">
            <div className="flex flex-col gap-1">
              <label>Name</label>
              <input
                className="py-1 px-2"
                type="text"
                defaultValue={pal?.name ? buildName(pal?.name) : ""}
              />
            </div>
          </form>
        )}
        {activePage === "drugs&alcohol" && (
          <form className="flex flex-col gap-3 basis-full md:basis-60">
            <h3 className="text-xl font-semibold">Preferences</h3>
            <div className="flex flex-col">
              <h4 className="text-lg">Alcohol</h4>
              <div className="flex gap-2">
                <label className="flex gap-1">
                  <input type="radio" name="alcohol" value="yes" />
                  <span>Yes</span>
                </label>
                <label className="flex gap-1">
                  <input type="radio" name="alcohol" value="no" />
                  <span>No</span>
                </label>
                <label className="flex gap-1">
                  <input type="radio" name="alcohol" value="no-preference" />
                  <span>No preference</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-lg">Drugs</h4>
              <div className="flex gap-2">
                <label className="flex gap-1">
                  <input type="radio" name="drugs" value="yes" />
                  <span>Yes</span>
                </label>
                <label className="flex gap-1">
                  <input type="radio" name="drugs" value="no" />
                  <span>No</span>
                </label>
                <label className="flex gap-1">
                  <input type="radio" name="drugs" value="no-preference" />
                  <span>No preference</span>
                </label>
              </div>
            </div>
          </form>
        )}
        {activePage === "food" && (
          <form className="flex flex-col gap-3 grow">
            <h3 className="text-xl font-semibold">Dietary Restrictions</h3>
            <div className="flex flex-col">
              <h4 className="text-lg">Meat</h4>
              <div className="flex flex-wrap gap-2">
                <label className="flex gap-1">
                  <input type="radio" name="meat" value="yes" />
                  <span>Yes</span>
                </label>
                <label className="flex gap-1">
                  <input type="radio" name="meat" value="no-red-meat" />
                  <span>No red meat</span>
                </label>
                <label className="flex gap-1">
                  <input type="radio" name="meat" value="vegetarian" />
                  <span>Vegetarian</span>
                </label>
                <label className="flex gap-1">
                  <input type="radio" name="meat" value="pescatarian" />
                  <span>Pescatarian</span>
                </label>
                <label className="flex gap-1">
                  <input type="radio" name="meat" value="vegan" />
                  <span>Vegan</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-lg">Allergies & Intolerances</h4>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 border rounded-xl p-4 basis-full md:basis-72">
                  <input
                    required
                    placeholder="Enter allergy or intolerance"
                    aria-label="Allergy / Intolerance"
                    className="py-1 px-2"
                    type="text"
                  />
                  <textarea
                    placeholder="Enter additional info"
                    aria-label="Additional details"
                    className="py-1 px-2"
                  />
                  <div className="flex gap-2">
                    <label className="flex gap-1">
                      <input type="radio" name="severity" value="severe" />
                      <span>Severe</span>
                    </label>
                    <label className="flex gap-1">
                      <input type="radio" name="severity" value="mild" />
                      <span>Mild</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
        {activePage === "crews" && crews && <CrewList crews={crews} />}
      </section>
    </div>
  );
}
