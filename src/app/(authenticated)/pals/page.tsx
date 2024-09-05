"use client";

import { useHeaderContext } from "@/app/ui/Header/useHeaderContext";
import { PalList } from "@/app/ui/PalList";
import { useEffect, useState } from "react";

export default function Page() {
  const { dispatch } = useHeaderContext();

  useEffect(() => {
    dispatch({ type: "SET_HEADER", payload: { message: "Pals" } });
  }, [dispatch]);

  const [pals, setPals] = useState<Pal[]>([]);

  useEffect(() => {
    fetch("/api/pals")
      .then((res) => res.json())
      .then((data) => {
        if (data.pals) {
          setPals(data.pals);
        }
      });
  }, [setPals]);

  return <PalList pals={pals} />;
}
