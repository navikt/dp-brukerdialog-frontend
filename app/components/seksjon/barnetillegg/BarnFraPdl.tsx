import { Box } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { Form } from "react-router";
import { Envalg } from "~/components/spørsmål/Envalg";
import { barnFraPdlSchema } from "~/seksjon-regelsett/barnetillegg/barnetillegg.schema";
import {
  Barn,
  barnFraPdlSpørsmål,
  forsørgerDuBarnet,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.spørsmål";
import { formaterNorskDato } from "~/utils/formattering.utils";

interface IProps {
  barn: Barn;
  barnIndex: number;
  validerBarnFraPdl: boolean;
  barnFraPdlList: Barn[];
  setBarnFraPdlList: (list: Barn[]) => void;
}

export function BarnFraPdl({
  barn,
  validerBarnFraPdl,
  barnIndex,
  barnFraPdlList,
  setBarnFraPdlList,
}: IProps) {
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
      const oppdatertBarn = {
        ...barnFraPdlList[barnIndex],
        forsørgerDuBarnet,
      };

      const oppdatertListe = [...barnFraPdlList];
      oppdatertListe[barnIndex] = oppdatertBarn;

      setBarnFraPdlList(oppdatertListe);
    }
  }, [form.formState]);

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <h3>
        {barn.fornavnOgMellomnavn} {barn.etternavn}
      </h3>
      {barn.fodselsdato && <p>{formaterNorskDato(new Date(barn.fodselsdato))}</p>}

      <Form {...form.getFormProps()}>
        <Envalg spørsmål={barnFraPdlSpørsmål} formScope={form.scope(forsørgerDuBarnet)} />
      </Form>
    </Box>
  );
}
