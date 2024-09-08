"use client";

import { useHeaderContext } from "@/app/ui/Header/useHeaderContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { dispatch } = useHeaderContext();
  const { id } = useParams();

  const [event, setEvent] = useState<PalEvent>();

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          setEvent(data.events[0]);
        }
      });
  }, [id, setEvent]);

  useEffect(() => {
    dispatch({ type: "SET_HEADER", payload: { message: event?.title } });
  }, [dispatch, event]);

  return <p>{event?.description}</p>;
}
