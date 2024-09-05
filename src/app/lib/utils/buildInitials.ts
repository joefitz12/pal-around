interface Props {
  first: string;
  last: string;
  [x: string]: any;
}

export function buildInitials(name: Props) {
  return [name?.first.charAt(0), name?.last.charAt(0)].join("");
}
