import { buildName } from "@/app/lib/utils/buildName";
import { MEAT_TITLES } from "./constants";
import { TablePalProfile } from "../TablePalProfile";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface Props {
  pals: Pal[];
}

export function FoodMatrix({ pals }: Props) {
  const [allergyIntolerances, setAllergyIntolerances] = useState<
    AllergyIntolerance[]
  >([]);

  useEffect(() => {
    fetch(`/api/allergy-intolerances/${pals.map((pal) => pal.id).join(",")}`)
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data.allergyIntolerances) {
          setAllergyIntolerances(data.allergyIntolerances);
          console.log({ allergyIntolerances: data.allergyIntolerances });
        }
      });
  }, [setAllergyIntolerances]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Meat</th>
          <th>Allergies & Intolerances</th>
        </tr>
      </thead>
      <tbody>
        {pals.map((pal) => {
          return (
            <tr key={pal.id}>
              <td>
                <div className="pr-3 py-2">
                  <TablePalProfile pal={pal} />
                </div>
              </td>
              <td>
                <div className="px-3 py-2">
                  <span className="whitespace-nowrap">
                    {MEAT_TITLES[pal.food.meat]}
                  </span>
                </div>
              </td>
              <td>
                <div className="px-3 py-2 flex gap-1">
                  {allergyIntolerances
                    .filter(
                      (allergyIntolerance) =>
                        allergyIntolerance.palId === pal.id
                    )
                    .map(({ name, description }) => (
                      <AllergyIntolerance
                        name={name}
                        description={description}
                      />
                    ))}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function AllergyIntolerance({
  name,
  description,
}: Pick<AllergyIntolerance, "name" | "description">) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={clsx(
        "grid transition-[grid-template-rows]",
        isExpanded ? "grid-rows-[1fr_auto]" : "grid-rows-[1fr_0]"
      )}
    >
      <button
        className="font-semibold whitespace-nowrap"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {name} {isExpanded ? "-" : "+"}
      </button>
      {/* <p
        className={clsx(
          "transition-opacity",
          !isExpanded && "opacity-0 pointer-events-none"
        )}
      >
        {description}
      </p> */}
    </div>
  );
}
