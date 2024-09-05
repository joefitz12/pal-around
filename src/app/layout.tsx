import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Link from "next/link";
import { HeaderContextProvider } from "./ui/Header/HeaderContextProvider";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pal Around",
  description: "Welcome to Pal Around!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          openSans.className,
          "flex flex-col max-h-svh overflow-clip"
        )}
      >
        <nav className="w-full flex justify-evenly items-center py-2">
          <Link href="/crews">Crews</Link>
          <Link href="/pals">Pals</Link>
          <Link href="/trips">Trips</Link>
          <Link href="/profile">Profile</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
