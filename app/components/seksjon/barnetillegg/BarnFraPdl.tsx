import { Box } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { Form } from "react-router";
import { Envalg } from "~/components/spørsmål/Envalg";
import { barnFraPdlSchema } from "~/seksjon-regelsett/barnetillegg/barnetillegg.schema";
import {
  Barn,
  barnFraPdlSpørsmål,
  forsørgerduBarnet,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.spørsmål";

interface IProps {
  barn: Barn;
  validerBarnFraPdl: boolean;
  setManglerBarnFraPdlSvar: (boolean: boolean) => void;
}

export function BarnFraPdl({ barn, validerBarnFraPdl, setManglerBarnFraPdlSvar }: IProps) {
  const barnFraPdlForm = useForm({
    method: "PUT",
    submitSource: "state",
    schema: barnFraPdlSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: {
      forsørgerduBarnet:
        typeof barn.forsørgerduBarnet === "boolean"
          ? barn.forsørgerduBarnet
            ? "ja"
            : "nei"
          : undefined,
    },
  });

  useEffect(() => {
    if (validerBarnFraPdl) {
      barnFraPdlForm.validate();
    }

    setManglerBarnFraPdlSvar(!!barnFraPdlForm.formState.fieldErrors);
  }, [validerBarnFraPdl, barnFraPdlForm]);

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <h3>
        {barn.fornavnOgMellomnavn} {barn.etternavn}
      </h3>
      <p>{barn.fodselsnummer.toString()}</p>

      <Form {...barnFraPdlForm.getFormProps()}>
        <Envalg spørsmål={barnFraPdlSpørsmål} formScope={barnFraPdlForm.scope(forsørgerduBarnet)} />
      </Form>
    </Box>
  );
}
