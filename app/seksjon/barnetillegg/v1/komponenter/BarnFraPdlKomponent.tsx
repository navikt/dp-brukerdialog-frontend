import { BodyShort, Box, Heading } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useMemo } from "react";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { Form } from "react-router";
import { useBarnetilleggContext } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { barnFraPdlSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import {
  BarnFraPdl,
  lagBarnFraPdlSpørsmål,
  bostedsland,
  etternavn,
  fornavnOgMellomnavn,
  forsørgerDuBarnet,
  fødselsdato,
} from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { finnLandnavnMedLocale } from "~/utils/land.utils";
import { Komponent } from "~/components/Komponent";

interface IProps {
  barn: BarnFraPdl;
}

export function BarnFraPdlKomponent({ barn: barnProps }: IProps) {
  const { t } = useVersjonertTranslation("barnetillegg", 1);
  const barnFraPdlSpørsmål = useMemo(() => lagBarnFraPdlSpørsmål(t), [t]);
  const { barnFraPdl, setbarnFraPdl, validerBarnFraPdl } = useBarnetilleggContext();

  const form = useForm({
    submitSource: "state",
    schema: barnFraPdlSchema,
    defaultValues: {
      ...barnProps,
    },
  });

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();

  useEffect(() => {
    if (validerBarnFraPdl) {
      form.validate();
    }
  }, [validerBarnFraPdl]);

  useEffect(() => {
    const forsørgerDuBarnetSvar = form.value(forsørgerDuBarnet);

    if (form.formState.isDirty && forsørgerDuBarnetSvar !== undefined) {
      const oppdatertListe = barnFraPdl.map((barn) =>
        barn.id === barnProps.id ? { ...barn, [forsørgerDuBarnet]: forsørgerDuBarnetSvar } : barn
      );

      setbarnFraPdl(oppdatertListe);
    }
  }, [form.formState]);

  return (
    <Box padding="space-16" background="sunken" borderRadius="16">
      <Heading size="small" spacing>
        {barnProps[fornavnOgMellomnavn]} {barnProps[etternavn]}
      </Heading>
      {barnProps[fødselsdato] && (
        <BodyShort size="medium" spacing>
          Født {formaterNorskDato(new Date(barnProps[fødselsdato]))}
        </BodyShort>
      )}
      {barnProps[bostedsland] && (
        <BodyShort size="small" spacing>
          BOR I {finnLandnavnMedLocale(barnProps[bostedsland]).toUpperCase()}
        </BodyShort>
      )}
      <Form id={formId} action={formAction}>
        {barnFraPdlSpørsmål.map((spørsmål) => {
          if (spørsmål.visHvis && !spørsmål.visHvis(formValues)) {
            return null;
          }

          return (
            <Komponent
              key={spørsmål.id}
              props={spørsmål}
              formValues={formValues}
              formScope={form.scope(spørsmål.id as keyof BarnFraPdl)}
            />
          );
        })}
      </Form>
    </Box>
  );
}
