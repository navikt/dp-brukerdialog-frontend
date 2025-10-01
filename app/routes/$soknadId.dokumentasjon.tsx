import { LoaderFunctionArgs } from "react-router";
import { DokumentasjonView } from "~/seksjon/dokumentasjon/DokumentasjonView";

export type DokumentasjonType = {
  uuid: string;
  dokumentasjonskrav: Dokumentasjonskrav[];
};

export type Dokumentasjonskrav = {
  id: string;
  referanseId: string; // Id som kan referere til et spesifikt dokumentasjonskrav i søknaden
  spørsmålId: string;
  seksjonId: string;
  filer: Fil[];
  svar: string;
  begrunnelse?: string;
};

export type Fil = {
  filnavn: string;
  urn: string;
  tidspunkt: string;
  storrelse: number;
  filsti: string;
};

const mockLoader: Dokumentasjonskrav[] = [
  {
    id: "1014.1",
    spørsmålId: "1014.1",
    referanseId: "1014.1",
    seksjonId: "dokumentasjon",
    filer: [
      {
        filnavn: "dummy.pdf",
        urn: "urn:vedlegg:2690f248-68a3-4609-a2c6-380dd73ee020/1014.1/e00d14d7-5e8c-46f9-8a61-ab23dc1e2251",
        filsti: "2690f248-68a3-4609-a2c6-380dd73ee020/1014.1/e00d14d7-5e8c-46f9-8a61-ab23dc1e2251",
        storrelse: 13264,
        tidspunkt: "2025-10-01T13:58:13.38429086+02:00",
      },
    ],
    svar: "send-nå",
    begrunnelse: "Dette er en begrunnelse",
  },
];

export async function loader({ request, params }: LoaderFunctionArgs) {
  // Todo: Hent oversikt over alle dokumentasjonskrav
  return mockLoader;
}

export default function DokumentasjonRoute() {
  // Sett inn riktig dokumentasjonskrav her i context
  return <DokumentasjonView />;
}
