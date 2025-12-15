import { BodyLong, InfoCard } from "@navikt/ds-react";
import { Informasjonskort } from "~/components/Komponent.types";
import parse from "html-react-parser";
import { ExclamationmarkTriangleIcon, InformationSquareIcon } from "@navikt/aksel-icons";

interface IProps {
  props: Informasjonskort;
}

export function Informasjonskort({ props }: Readonly<IProps>) {
  const getIcon = () => {
    switch (props.variant) {
      case "informasjon":
        return <InformationSquareIcon aria-hidden />;
      case "advarsel":
        return <ExclamationmarkTriangleIcon aria-hidden />;
    }
  };

  const getDataColor = () => {
    switch (props.variant) {
      case "informasjon":
        return "info";
      case "advarsel":
        return "warning";
    }
  };

  return (
    <InfoCard data-color={getDataColor()}>
      <InfoCard.Header icon={getIcon()}>
        <InfoCard.Title>{props.label}</InfoCard.Title>
      </InfoCard.Header>
      <InfoCard.Content>
        <BodyLong>
          {<BodyLong spacing>{parse(props.description || "", { trim: true })}</BodyLong>}
        </BodyLong>
      </InfoCard.Content>
    </InfoCard>
  );
}
