interface Props {
  first: string;
  last: string;
  [x: string]: any;
}

export function buildName(name: Props) {
  return [name.first, name.last].join(" ");
}
