import { Heading } from "@navikt/ds-react";
import { useRef } from "react";
import { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Brukerdialog - Din inntekt" },
    { name: "description", content: "Brukerdialog - Din inntekt" },
  ];
};

export default function DinInntektIndex() {
  const appRef = useRef<HTMLDivElement>(null);

  return (
    <div className="brukerdialog" ref={appRef} id="brukerdialog">
      <Heading size="large" level={"1"} id="header-icon">
        Brukerdialog
      </Heading>
    </div>
  );
}
