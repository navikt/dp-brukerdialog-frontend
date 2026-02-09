import { LocalAlert } from "@navikt/ds-react";

interface IProps {
  tittel: string;
  beskrivelse: string;
}

export function SeksjonTekniskFeil({ tittel, beskrivelse }: IProps) {
  return (
    <LocalAlert status="error">
      <LocalAlert.Header>
        <LocalAlert.Title>{tittel}</LocalAlert.Title>
      </LocalAlert.Header>
      <LocalAlert.Content>{beskrivelse}</LocalAlert.Content>
    </LocalAlert>
  );
}
