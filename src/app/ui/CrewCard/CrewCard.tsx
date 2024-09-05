import Link from "next/link";
import "./index.css";
import Image from "next/image";
import { buildName } from "@/app/lib/utils/buildName";

interface Props {
  id: string;
  name: string;
  pals: Pal[];
}

export function CrewCard({ id, name, pals }: Props) {
  console.log({ pals });

  return (
    <div className="basis-full md:basis-60 grid gap-4 border border-[rgb(var(--foreground-rgb))] rounded-lg p-3 pb-0">
      <div className="flex font-semibold -mx-3 pl-3">
        <span className="flex items-center justify-center rounded-full min-w-12 min-h-12 max-w-12 max-h-12 border border-[rgb(var(--foreground-rgb))] text-2xl">
          {name.charAt(0)}
        </span>
        <span className="grow border-b flex items-center px-3 text-xl">
          {name}
        </span>
      </div>
      <div className="flex items-center gap-2 -mx-3 px-3">
        <span className="font-semibold">Pals</span>
        <div className="flex gap-1">
          {pals.map((pal) => (
            <Link href={`/pals/${pal.id}`}>
              <Image
                src={pal?.photo}
                alt={pal?.name ? `${buildName(pal.name)}` : ""}
                width={16}
                height={16}
                className="rounded-full"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex font-semibold -mx-3 px-3">Upcoming Trips</div>
      <div className="flex -mx-3">
        <Link
          href={`/crews/${id}`}
          className="min-w-[50%] max-w-[50%] border-r border-t text-center p-1"
        >
          View Profile
        </Link>
        <Link
          href={`sms://open?addresses=${pals
            .map((pal) => pal?.phone)
            .join(",")}`}
          className="min-w-[50%] max-w-[50%] border-t text-center p-1"
        >
          Message
        </Link>
      </div>
    </div>
  );
}
