"use client";

import "../globals.css";
import { Header } from "../ui/Header";
import { HeaderContextProvider } from "../ui/Header/HeaderContextProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <Header />
      <main className="px-6 pb-6 overflow-auto">{children}</main>
    </AppProvider>
  );
}

function AppProvider({ children }: { children: React.ReactNode }) {
  return <HeaderContextProvider>{children}</HeaderContextProvider>;
}
