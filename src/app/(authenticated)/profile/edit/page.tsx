"use client";

import { useHeaderContext } from "@/app/ui/Header/useHeaderContext";
import { useEffect, useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Page() {
  const { dispatch } = useHeaderContext();

  useEffect(() => {
    dispatch({
      type: "SET_HEADER",
      payload: {
        message: (
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-semibold">Profile</h1>
            <Link href="/profile">
              <FontAwesomeIcon icon={faFloppyDisk} />
            </Link>
          </div>
        ),
      },
    });
  }, [dispatch]);

  const [self, setSelf] = useState<{ name: string }>();

  useEffect(() => {
    fetch("/api/self")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSelf(data);
        }
      });
  }, [setSelf]);

  const navId = useId();
  const [activePage, setActivePage] = useState<
    "account" | "drugs&alcohol" | "food"
  >("account");

  return (
    <div className="flex flex-col gap-4">
      <nav id={navId} className="flex gap-4">
        <button onClick={() => setActivePage("account")}>Account</button>
        <button onClick={() => setActivePage("food")}>Food</button>
        <button onClick={() => setActivePage("drugs&alcohol")}>
          Drugs & Alcohol
        </button>
      </nav>
      <section className="flex gap-4 w-full md:w-auto">
        {activePage === "account" && (
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
                  <input type="radio" name="meat" value="plant-based" />
                  <span>Plant-based</span>
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
      </section>
    </div>
  );
}
