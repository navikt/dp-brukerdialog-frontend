import { BodyShort, Box, Heading } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { Form } from "react-router";
import { Envalg } from "~/components/spørsmål/Envalg";
import { findLandeNavn } from "~/constants";
import { useBarnetilleggContext } from "~/context/barnetillegg.context";
import { barnFraPdlSchema } from "~/seksjon/barnetillegg/barnetillegg.schema";
import {
  Barn,
  barnFraPdlSpørsmål,
  forsørgerDuBarnet,
} from "~/seksjon/barnetillegg/barnetillegg.spørsmål";
import { formaterNorskDato } from "~/utils/formattering.utils";

interface IProps {
  barn: Barn;
  barnIndex: number;
}

export function BarnFraPdl({ barn, barnIndex }: IProps) {
  const { barnFraPdl, setbarnFraPdl, validerBarnFraPdl } = useBarnetilleggContext();

  const form = useForm({
    submitSource: "state",
    schema: barnFraPdlSchema,
    defaultValues: {
      forsørgerDuBarnet: barn.forsørgerDuBarnet || undefined,
    },
  });

  useEffect(() => {
    if (validerBarnFraPdl) {
      form.validate();
    }
  }, [validerBarnFraPdl]);

  useEffect(() => {
    const forsørgerDuBarnet = form.value("forsørgerDuBarnet");

    if (form.formState.isDirty && forsørgerDuBarnet !== undefined) {
      const gammeltBarn = barnFraPdl[barnIndex];
      const oppdatertBarn: Barn = {
        etternavn: gammeltBarn.etternavn,
        bostedsland: gammeltBarn.bostedsland,
        fødselsdato: gammeltBarn.fødselsdato,
        fornavnOgMellomnavn: gammeltBarn.fornavnOgMellomnavn,
        forsørgerDuBarnet: forsørgerDuBarnet,
      };

      const oppdatertListe = [...barnFraPdl];
      oppdatertListe[barnIndex] = oppdatertBarn;

      setbarnFraPdl(oppdatertListe);
    }
  }, [form.formState]);

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <Heading size="small" spacing>
        {barn.fornavnOgMellomnavn} {barn.etternavn}
      </Heading>
      {barn.fødselsdato && (
        <BodyShort size="medium" spacing>
          Født {formaterNorskDato(new Date(barn.fødselsdato))}
        </BodyShort>
      )}
      {barn.bostedsland && (
        <BodyShort size="small" spacing>
          BOR I {findLandeNavn(barn.bostedsland).toUpperCase()}
        </BodyShort>
      )}

      <Form {...form.getFormProps()}>
        <Envalg
          spørsmål={barnFraPdlSpørsmål}
          formScope={form.scope(forsørgerDuBarnet)}
          horisontal={true}
        />
      </Form>
    </Box>
  );
}
