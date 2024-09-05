import { buildName } from "@/app/lib/utils/buildName";
import Image from "next/image";

interface Props {
  pal: Pal;
  displayLastName?: boolean;
}

export function TablePalProfile({ pal, displayLastName = true }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={pal.photo}
        alt=""
        width={24}
        height={24}
        className="rounded-full"
      />
      <span className="whitespace-nowrap">
        {displayLastName ? buildName(pal.name) : pal.name.first}
      </span>
    </div>
  );
}
