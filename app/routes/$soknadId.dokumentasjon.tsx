import { LoaderFunctionArgs } from "react-router";
import { DokumentasjonView } from "~/seksjon/dokumentasjon/DokumentasjonView";

export type DokumentasjonType = {
  uuid: string;
  dokumentasjonskrav: Dokumentasjonskrav[];
};

export type Dokumentasjonskrav = {
  id: string;
  referanseId: string; // Id som kan referere til et spesifikt dokumentasjonskrav i søknaden
  filer: Fil[];
  svar: string;
  begrunnelse?: string;
};

export type Fil = {
  filnavn: string;
  url: string;
  tidspunkt: string;
  storrelse: number;
  filsti: string;
  bundlet: boolean;
};

const mockLoader: Dokumentasjonskrav[] = [
  {
    id: "1014.1",
    referanseId: "1014.1",
    filer: [],
    svar: "send-nå",
    begrunnelse: "Dette er en begrunnelse",
  },
  {
    id: "1014.1",
    referanseId: "1014.1",
    filer: [],
    svar: "send-nå",
    begrunnelse: "Dette er en begrunnelse",
  },
  {
    id: "1014.1",
    referanseId: "1014.1",
    filer: [],
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
