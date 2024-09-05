"use client";

import { CrewList } from "@/app/ui/CrewList";
import { useHeaderContext } from "@/app/ui/Header/useHeaderContext";
import { useEffect, useState } from "react";

export default function Page() {
  const { dispatch } = useHeaderContext();

  useEffect(() => {
    dispatch({ type: "SET_HEADER", payload: { message: "Crews" } });
  }, [dispatch]);

  const [crews, setCrews] = useState();

  useEffect(() => {
    fetch("/api/previews/crews")
      .then((res) => res.json())
      .then((data) => {
        if (data.crews) {
          setCrews(data.crews);
        }
      });
  }, [setCrews]);

  return crews ? <CrewList crews={crews} /> : null;
}
