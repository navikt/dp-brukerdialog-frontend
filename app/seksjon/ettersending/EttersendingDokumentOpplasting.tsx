import { Box, VStack } from "@navikt/ds-react";
import { useParams } from "react-router";
import { DokumentkravFil, EttersendingFilOpplasting } from "~/components/EttersendingFilOpplasting";
import { dokumentkravSvarSendNå } from "../dokumentasjon/dokumentasjonskrav.komponenter";
import {
  Bundle,
  Dokumentasjonskrav,
  GyldigDokumentkravSvar,
} from "../dokumentasjon/DokumentasjonskravKomponent";
import { useEttersendingContext } from "./ettersending.context";
import { useState } from "react";

interface DokumentasjonskravProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function EttersendingDokumentOpplasting({ dokumentasjonskrav }: DokumentasjonskravProps) {
  const { soknadId } = useParams();
  const { dokumentasjonskrav: alleDokumentasjonskrav } = useEttersendingContext();

  async function lagreDokumentasjonskravsvar(oppdatertDokumentasjonskrav: Dokumentasjonskrav) {
    try {
      const oppdatertDokumentasjonskravListe = alleDokumentasjonskrav
        .filter(
          (etDokumentasjonskrav) =>
            etDokumentasjonskrav.seksjonId === oppdatertDokumentasjonskrav.seksjonId
        )
        .map((etDokumentasjonskrav) =>
          etDokumentasjonskrav.id === oppdatertDokumentasjonskrav.id
            ? oppdatertDokumentasjonskrav
            : etDokumentasjonskrav
        );

      const formData = new FormData();
      formData.append("dokumentasjonskrav", JSON.stringify(oppdatertDokumentasjonskravListe));

      const response = await fetch(
        `/api/dokumentasjonskrav/${soknadId}/${dokumentasjonskrav.seksjonId}/${oppdatertDokumentasjonskrav.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("ok");
      } else {
        console.error("Feil ved lagring av dokumentasjonskrav:", oppdatertDokumentasjonskrav.id);
      }
    } catch (error) {
      console.error("Feil ved lagring av dokumentasjonskrav:", error);
    }
  }

  return (
    <Box.New padding="space-16" background="sunken" borderRadius="large" className="mt-4">
      <VStack gap="8">
        <EttersendingFilOpplasting dokumentasjonskrav={dokumentasjonskrav} />
      </VStack>
    </Box.New>
  );
}
