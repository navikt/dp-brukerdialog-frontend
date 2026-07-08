import { FilesIcon } from "@navikt/aksel-icons";
import { Alert, BodyShort, Button, HStack, Modal, VStack } from "@navikt/ds-react";
import { useRef, useState } from "react";
import { lagDokumentasjonskrav } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.dokumentasjonskrav";
import { TidligereArbeidsforhold } from "~/models/hent-tidligere-arbeidsforhold.server";
import {
  Arbeidsforhold,
  harDuJobbetSkiftTurnusEllerRotasjon,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  navnetPåBedriften,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";

type Props = {
  tidligereArbeidsforhold: TidligereArbeidsforhold;
  onKopier: (arbeidsforhold: Arbeidsforhold[], dokumentasjonskrav: Dokumentasjonskrav[]) => void;
};

export function KopierArbeidsforholdBanner({ tidligereArbeidsforhold, onKopier }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [kopiert, setKopiert] = useState(false);

  const antall = tidligereArbeidsforhold.registrerteArbeidsforhold.length;

  function bekreftKopiering() {
    const alleNyeDokumentasjonskrav: Dokumentasjonskrav[] = [];

    const kopierteMedNyId: Arbeidsforhold[] = tidligereArbeidsforhold.registrerteArbeidsforhold.map(
      (arbeidsforhold) => {
        const nyeDokumentasjonskrav = lagDokumentasjonskrav(
          arbeidsforhold[harDuJobbetSkiftTurnusEllerRotasjon] ?? "",
          arbeidsforhold[hvordanHarDetteArbeidsforholdetEndretSeg] ?? "",
          arbeidsforhold[navnetPåBedriften] ?? ""
        );
        alleNyeDokumentasjonskrav.push(...nyeDokumentasjonskrav);

        return {
          ...arbeidsforhold,
          id: crypto.randomUUID(),
          dokumentasjonskrav: nyeDokumentasjonskrav.map((krav) => krav.id),
        };
      }
    );

    onKopier(kopierteMedNyId, alleNyeDokumentasjonskrav);
    setKopiert(true);
    ref.current?.close();
  }

  if (kopiert) {
    return (
      <Alert variant="success" size="small">
        {antall} arbeidsforhold er kopiert fra forrige søknad. Husk at dokumentasjonskrav gjelder
        uansett — du finner en oversikt til slutt i søknaden.
      </Alert>
    );
  }

  return (
    <>
      <Alert variant="info" size="small">
        <VStack gap="space-8">
          <BodyShort>
            Du har registrert {antall} arbeidsforhold i en tidligere søknad. Du kan kopiere disse
            inn her. Husk at dokumentasjonskrav gjelder uansett, og du finner en oversikt til slutt
            i søknaden.
          </BodyShort>
          <HStack>
            <Button
              variant="secondary"
              size="small"
              type="button"
              icon={<FilesIcon aria-hidden />}
              onClick={() => ref.current?.showModal()}
            >
              Kopier arbeidsforhold fra forrige søknad
            </Button>
          </HStack>
        </VStack>
      </Alert>

      <Modal ref={ref} header={{ heading: "Kopier arbeidsforhold?" }} aria-labelledby="kopier-modal-heading">
        <Modal.Body>
          <VStack gap="space-16">
            <BodyShort>
              Dette vil kopiere {antall} arbeidsforhold fra din forrige søknad og erstatte det du
              eventuelt allerede har lagt inn.
            </BodyShort>
            <BodyShort>
              Husk at dokumentasjonskrav gjelder uansett — du finner en oversikt til slutt i
              søknaden.
            </BodyShort>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="button" onClick={bekreftKopiering}>
            Ja, kopier arbeidsforhold
          </Button>
          <Button variant="tertiary" type="button" onClick={() => ref.current?.close()}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
