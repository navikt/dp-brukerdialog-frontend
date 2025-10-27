import { BodyLong, Box, FileObject, Heading, VStack } from "@navikt/ds-react";
import { FileUploadDropzone, FileUploadItem } from "@navikt/ds-react/FileUpload";
import { useForm } from "@rvf/react-router";
import { useState } from "react";
import { Form, useParams } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  hentMaksFilStørrelseMB,
  hentTillatteFiltyperString,
  hentTillatteFiltyperTekst,
  MAX_ANTALL_FILER,
  MAX_FIL_STØRRELSE,
  TILLATTE_FILFORMAT,
} from "~/utils/dokument.utils";
import { dokumentasjonskravSchema } from "./dokumentasjonskrav.schema";
import {
  dokumentasjonskravSpørsmål,
  DokumentasjonskravSvar,
  DOKUMENTKRAV_SVAR_SEND_NAA,
  DOKUMENTKRAV_SVAR_SENDER_IKKE,
  DOKUMENTKRAV_SVAR_SENDER_SENERE,
  DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE,
  velgHvaDuVilGjøre,
} from "./dokumentasjonskrav.spørsmål";

export type DokumentkravFil = {
  id: string;
  filnavn: string;
  urn?: string;
  tidspunkt?: string;
  storrelse?: number;
  filsti?: string;
  lasterOpp?: boolean;
  file?: File;
  feil?: FeilType;
};

export type DokumentasjonskravType = {
  id: string;
  spørsmålId: string;
  tittel?: string;
  type?: "Barn" | "Arbeidsforhold";
  gyldigeValg?: GyldigDokumentkravSvar[];
  svar?: GyldigDokumentkravSvar;
  begrunnelse?: string;
  bundle?: string;
  bundleFilsti?: string;
};

export type GyldigDokumentkravSvar =
  | typeof DOKUMENTKRAV_SVAR_SEND_NAA
  | typeof DOKUMENTKRAV_SVAR_SENDER_SENERE
  | typeof DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE
  | typeof DOKUMENTKRAV_SVAR_SENDER_IKKE;

type FeilType = "FIL_FOR_STOR" | "UGYLDIG_FORMAT" | "TEKNISK_FEIL" | "DUPLIKAT_FIL" | "UKJENT_FEIL";

interface DokumentasjonskravProps {
  dokumentasjonskrav: DokumentasjonskravType;
}

export function Dokumentasjonskrav({ dokumentasjonskrav }: DokumentasjonskravProps) {
  const { soknadId } = useParams();
  const [dokumentkravFiler, setDokumentkravFiler] = useState<DokumentkravFil[]>([]);

  // Todo,
  // Håndtere retry ved feil
  async function lastOppfiler(filer: FileObject[]) {
    const filerMedEnFeil: DokumentkravFil[] = [];
    const filerKlarTilOpplasting: DokumentkravFil[] = [];

    filer.forEach((fil: FileObject) => {
      const erDuplikat = dokumentkravFiler.some((f) => f.filnavn === fil.file.name);
      const erGyldigFormat = TILLATTE_FILFORMAT.some((format) => fil.file.name.endsWith(format));

      if (erDuplikat) {
        filerMedEnFeil.push({
          id: crypto.randomUUID(),
          filnavn: fil.file.name,
          feil: "DUPLIKAT_FIL",
        });
      } else if (!erGyldigFormat) {
        filerMedEnFeil.push({
          id: crypto.randomUUID(),
          filnavn: fil.file.name,
          feil: "UGYLDIG_FORMAT",
        });
      } else if (fil.file.size > MAX_FIL_STØRRELSE) {
        filerMedEnFeil.push({
          id: crypto.randomUUID(),
          filnavn: fil.file.name,
          feil: "FIL_FOR_STOR",
        });
      } else {
        filerKlarTilOpplasting.push({
          id: crypto.randomUUID(),
          file: fil.file,
          filnavn: fil.file.name,
          lasterOpp: true,
        });
      }
    });

    setDokumentkravFiler((prev) => [...prev, ...filerMedEnFeil, ...filerKlarTilOpplasting]);

    if (filerKlarTilOpplasting.length > 0) {
      try {
        const responser = await Promise.all(
          filerKlarTilOpplasting.map(async (fil) => {
            if (!fil.file) {
              console.error("Mangler fil data");
              return;
            }

            const formData = new FormData();
            formData.append("file", fil.file);

            const url = `/api/dokument/last-opp/${soknadId}/${dokumentasjonskrav.id}`;
            const respons = await fetch(url, { method: "POST", body: formData });

            if (!respons.ok) {
              return {
                filnavn: fil.file.name,
                storrelse: fil.file.size,
                lasterOpp: false,
                feil: "TEKNISK_FEIL",
                id: fil.id,
              };
            }

            const filer = await respons.json();

            return {
              ...filer[0], // Mellomlagring returnerer en liste
              lasterOpp: false,
              feil: undefined,
              id: fil.id,
            };
          })
        );

        setDokumentkravFiler((prev) =>
          prev.map((fil) => ({ ...fil, ...responser.find((respons) => respons.id === fil.id) }))
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  function hentFilFeilmelding(feilType: FeilType) {
    switch (feilType) {
      case "FIL_FOR_STOR":
        return `Filstørrelsen overskrider ${hentMaksFilStørrelseMB()} MB`;
      case "UGYLDIG_FORMAT":
        return "Ugyldig filformat";
      case "TEKNISK_FEIL":
        return "Det oppstod en teknisk feil";
      case "DUPLIKAT_FIL":
        return "Filene er duplikater";
      case "UKJENT_FEIL":
        return "Det oppstod en ukjent feil";
      default:
        return "Det oppstod en ukjent feil";
    }
  }

  function hentBeskrivelse(type: string) {
    switch (type) {
      case "Barn":
        return "Dokumentasjon for barn lagt til i søknaden";
      case "Arbeidsforhold":
        return "Dokumentasjon for arbeidsforhold lagt til i søknaden";
      default:
        return "Dokumentasjon";
    }
  }

  async function slettEnFil(fil: DokumentkravFil) {
    if (fil.feil) {
      setDokumentkravFiler((prev) => prev.filter((f) => !(f.filnavn === fil.filnavn && f.feil)));
      return;
    }

    if (!fil.filsti) {
      console.error("Ingen filsti for fil, kan ikke slette");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("filsti", fil.filsti);

      const response = await fetch(`/api/dokument/slett/${soknadId}/1014.1`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return;
      }

      setDokumentkravFiler((prev) => prev.filter((f) => f.filsti !== fil.filsti));

      return await response.text();
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: dokumentasjonskravSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: {},
  });

  // Todo:
  // Sett tittel på dokumentasjonskrav
  // Sett dokumentasjonskrav beskrivelse
  return (
    <Box padding="space-16" background="surface-subtle" borderRadius="large" className="mt-4">
      <VStack gap="8">
        <Form {...form.getFormProps()}>
          <VStack gap="4">
            <Heading size="small" level="3">
              {dokumentasjonskrav.tittel || "Dokumentasjon"}
            </Heading>

            {dokumentasjonskrav.type && (
              <BodyLong>{hentBeskrivelse(dokumentasjonskrav.type)}</BodyLong>
            )}

            {dokumentasjonskravSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof DokumentasjonskravSvar)}
                />
              );
            })}
          </VStack>

          {form.value(velgHvaDuVilGjøre) === DOKUMENTKRAV_SVAR_SEND_NAA && (
            <FileUploadDropzone
              className="mt-4"
              label="Last opp dokument"
              description={`Maks filstørrelse er ${hentMaksFilStørrelseMB()} MB, og tillatte filtyper er ${hentTillatteFiltyperTekst()}.`}
              fileLimit={{ max: MAX_ANTALL_FILER, current: dokumentkravFiler.length }}
              accept={hentTillatteFiltyperString()}
              onSelect={(filer) => lastOppfiler(filer)}
            />
          )}
        </Form>
      </VStack>
      <VStack gap="4" className="mt-8">
        {dokumentkravFiler?.map((fil) => (
          <FileUploadItem
            key={fil.id}
            file={{ name: fil.filnavn, size: fil.storrelse }}
            status={fil.lasterOpp ? "uploading" : "idle"}
            translations={{ uploading: "Laster opp..." }}
            error={fil.feil ? hentFilFeilmelding(fil.feil) : undefined}
            button={{
              action: "delete",
              onClick: () => slettEnFil(fil),
            }}
          />
        ))}
      </VStack>
    </Box>
  );
}
