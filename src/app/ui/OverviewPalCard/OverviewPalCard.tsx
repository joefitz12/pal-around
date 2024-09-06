import Link from "next/link";
import { buildName } from "@/app/lib/utils/buildName";
import Image from "next/image";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";

interface Props extends Pal {}

export function OverviewPalCard({ id, name, photo, phone, birthday }: Props) {
  return (
    <div className="w-30 grid gap-2 border border-[rgb(var(--foreground-rgb))] rounded-lg p-3 pb-0 relative">
      <div className="flex items-center font-semibold -mx-3 pl-3">
        <span className="flex items-center justify-center rounded-full min-w-6 min-h-6 max-w-6 max-h-6 border border-[rgb(var(--foreground-rgb))] overflow-hidden">
          <Image
            src={photo}
            width={24}
            height={24}
            className="object-cover"
            alt={`${buildName(name)} Profile Photo`}
          />
        </span>
        <span className={clsx("grow flex items-center px-3 text-lg")}>
          {name.first}
        </span>
      </div>
      <div className="flex -mx-3 mt-auto">
        <Link
          href={`/pals/${id}`}
          className="min-w-[50%] max-w-[50%] border-r border-t flex justify-center p-1 px-4"
        >
          Profile
        </Link>
        <Link
          href={`sms://open?addresses=${phone}`}
          className="min-w-[50%] max-w-[50%] border-t flex justify-center p-1 px-4"
        >
          Message
        </Link>
      </div>
      {new Date().getMonth() === new Date(birthday).getMonth() && (
        <FontAwesomeIcon
          icon={faBirthdayCake}
          className="absolute right-1 top-1 w-3 h-3"
          title={new Date(birthday).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
          })}
        />
      )}
    </div>
  );
}
