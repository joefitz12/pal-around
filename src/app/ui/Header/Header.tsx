"use client";

import { useHeaderContext } from "./useHeaderContext";

export function Header() {
  const { state } = useHeaderContext();

  return (
    <header className="flex gap-4 justify-between items-center px-6 py-2 bg-inherit sticky top-0 z-10">
      {typeof state?.message === "string" ? (
        <h1 className="text-3xl font-semibold">{state?.message || ""}</h1>
      ) : (
        state?.message
      )}
    </header>
  );
}
