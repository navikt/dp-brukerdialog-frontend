import { BodyShort, Box, Heading } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { Form } from "react-router";
import { useBarnetilleggContext } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { barnFraPdlSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import {
  BarnFraPdl,
  barnFraPdlSpørsmål,
  bostedsland,
  etternavn,
  fornavnOgMellomnavn,
  forsørgerDuBarnet,
  fødselsdato,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { formaterNorskDato } from "~/utils/formattering.utils";
import { finnLandnavnMedLocale } from "~/utils/land.utils";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";

interface IProps {
  barn: BarnFraPdl;
}

export function BarnFraPdlKomponent({ barn }: IProps) {
  const { barnFraPdl, setbarnFraPdl, validerBarnFraPdl } = useBarnetilleggContext();

  const form = useForm({
    submitSource: "state",
    schema: barnFraPdlSchema,
    defaultValues: {
      ...barn,
    },
  });

  useEffect(() => {
    if (validerBarnFraPdl) {
      form.validate();
    }
  }, [validerBarnFraPdl]);

  useEffect(() => {
    const forsørgerDuBarnetSvar = form.value(forsørgerDuBarnet);

    if (form.formState.isDirty && forsørgerDuBarnetSvar !== undefined) {
      const oppdatertListe = barnFraPdl.map((etBarn) =>
        etBarn.id === barn.id ? { ...etBarn, [forsørgerDuBarnet]: forsørgerDuBarnetSvar } : etBarn
      );

      setbarnFraPdl(oppdatertListe);
    }
  }, [form.formState]);

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <Heading size="small" spacing>
        {barn[fornavnOgMellomnavn]} {barn[etternavn]}
      </Heading>
      {barn[fødselsdato] && (
        <BodyShort size="medium" spacing>
          Født {formaterNorskDato(new Date(barn[fødselsdato]))}
        </BodyShort>
      )}
      {barn[bostedsland] && (
        <BodyShort size="small" spacing>
          BOR I {finnLandnavnMedLocale(barn[bostedsland]).toUpperCase()}
        </BodyShort>
      )}

      <Form {...form.getFormProps()}>
        {barnFraPdlSpørsmål.map((spørsmål) => {
          if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
            return null;
          }

          return (
            <Spørsmål
              key={spørsmål.id}
              spørsmål={spørsmål}
              formScope={form.scope(spørsmål.id as keyof BarnFraPdl)}
            />
          );
        })}
      </Form>
    </Box>
  );
}
