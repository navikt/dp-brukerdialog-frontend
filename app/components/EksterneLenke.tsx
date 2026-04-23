import { Button, Link } from "@navikt/ds-react";

interface IProps {
  href: string;
  tekst: string;
  asButton?: boolean;
  targetBlank?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
}

export function EksterneLenke({ href, tekst, asButton, targetBlank, variant }: IProps) {
  if (asButton) {
    return (
      <div>
        <Button
          variant={variant}
          onClick={() => {
            window.location.href = href;
          }}
          className="block"
        >
          {tekst}
        </Button>
      </div>
    );
  }

  return (
    <Link
      href={href}
      target={targetBlank ? "_blank" : undefined}
      rel={targetBlank ? "noopener noreferrer" : undefined}
    >
      {tekst}
    </Link>
  );
}
