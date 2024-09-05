import { buildName } from "@/app/lib/utils/buildName";
import { TablePalProfile } from "../TablePalProfile";

interface Props {
  pals: any[];
}

export function DrugsAlcoholMatrix({ pals }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Alcohol</th>
          <th>Drugs</th>
        </tr>
      </thead>
      <tbody>
        {pals.map((pal) => {
          return (
            <tr>
              <td>
                <div className="pr-3 py-2">
                  <TablePalProfile pal={pal} />
                </div>
              </td>
              <td>
                <div className="px-3 py-2"></div>
              </td>
              <td>
                <div className="px-3 py-2"></div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
