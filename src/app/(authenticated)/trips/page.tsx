"use client";

import { useHeaderContext } from "@/app/ui/Header/useHeaderContext";
import { TripList } from "@/app/ui/TripList";
import { useEffect } from "react";

export default function Page() {
  const { dispatch } = useHeaderContext();

  useEffect(() => {
    dispatch({ type: "SET_HEADER", payload: { message: "Trips" } });
  }, [dispatch]);

  return <TripList />;
}
