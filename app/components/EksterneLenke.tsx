import { Link } from "@navikt/ds-react";

interface IProps {
  href: string;
  tekst: string;
}

export function EksterneLenke({ href, tekst }: IProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {tekst}
    </Link>
  );
}
