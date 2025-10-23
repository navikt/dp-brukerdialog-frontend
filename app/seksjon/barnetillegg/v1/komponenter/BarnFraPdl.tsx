import { BodyShort, Box, Heading } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { Form } from "react-router";
import { Envalg } from "~/components/spørsmål/Envalg";
import { useBarnetilleggContext } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { barnFraPdlSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import {
  Barn,
  barnFraPdlSpørsmål,
  forsørgerDuBarnet,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { formaterNorskDato } from "~/utils/formattering.utils";
import { finnLandnavnMedLocale } from "~/utils/land.utils";

interface IProps {
  barn: Barn;
}

export function BarnFraPdl({ barn }: IProps) {
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
      const oppdatertListe = barnFraPdl.map((b) =>
        b.id === barn.id ? { ...b, forsørgerDuBarnet } : b
      );

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
          BOR I {finnLandnavnMedLocale(barn.bostedsland).toUpperCase()}
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
