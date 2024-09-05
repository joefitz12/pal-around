import Link from "next/link";
import "./index.css";
import { buildName } from "@/app/lib/utils/buildName";
import Image from "next/image";
import clsx from "clsx";

interface Props extends Pal {
  displayCrews: boolean;
  displayTrips: boolean;
}

export function PalCard({
  id,
  name,
  photo,
  phone,
  displayCrews,
  displayTrips,
}: Props) {
  return (
    <div className="basis-full md:basis-60 grid gap-4 border border-[rgb(var(--foreground-rgb))] rounded-lg p-3 pb-0">
      <div className="flex font-semibold -mx-3 pl-3">
        <span className="flex items-center justify-center rounded-full min-w-12 min-h-12 max-w-12 max-h-12 border border-[rgb(var(--foreground-rgb))] text-2xl overflow-hidden">
          <Image
            src={photo}
            width={48}
            height={48}
            className="object-cover"
            alt={`${buildName(name)} Profile Photo`}
          />
        </span>
        <span
          className={clsx(
            "grow flex items-center px-3 text-xl",
            (displayCrews || displayTrips) && "border-b"
          )}
        >
          {buildName(name)}
        </span>
      </div>
      {displayCrews && (
        <div className="flex font-semibold -mx-3 px-3">Crews</div>
      )}
      {displayTrips && (
        <div className="flex font-semibold -mx-3 px-3">Trips</div>
      )}
      <div className="flex -mx-3 mt-auto">
        <Link
          href={`/pals/${id}`}
          className="min-w-[50%] max-w-[50%] border-r border-t text-center p-1"
        >
          View Profile
        </Link>
        <Link
          href={`sms://open?addresses=${phone}`}
          className="min-w-[50%] max-w-[50%] border-t text-center p-1"
        >
          Message
        </Link>
      </div>
    </div>
  );
}
