import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Box, Button, HStack, Page, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import { data, Form, LoaderFunctionArgs, useLoaderData } from "react-router";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import RedigerBarnModal from "~/components/soknad/barnetillegg/RedigerBarnModal";
import { formaterNorskDato } from "~/utils/formattering.utils";
import {
  barneSchema,
  barneTilleggSchema,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.schema";
import {
  BarneSvar,
  barnetilleggSporsmal,
  BarnetilleggSvar,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.sporsmal";
import { hentFormDefaultValues } from "~/utils/form.utils";
import LeggTilBarnModal from "~/components/soknad/barnetillegg/LeggTilBarnModal";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "barnetillegg");
  if (!response.ok) {
    return data(undefined);
  }

  const loaderData: BarnetilleggSvar = await response.json();
  return data(loaderData);
}

export async function action({ request, params }: LoaderFunctionArgs) {
  console.log("Performing action for barnetillegg");
  return null;
}

export default function BarneTillegg() {
  const barnetilleggLoaderData = useLoaderData<typeof loader>();
  const ref = useRef<HTMLDialogElement>(null);
  const leggTilBarnRef = useRef<HTMLDialogElement>(null);
  const [modalBarn, setModalBarn] = useState<BarneSvar | undefined>(undefined);
  const [visModal, setVisModal] = useState(false);
  const [visLeggTilModal, setVisLeggTilModal] = useState(false);
  const [antallManuelleBarn, setAntallManuelleBarn] = useState(-1);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: barneTilleggSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: hentFormDefaultValues<BarnetilleggSvar>(barnetilleggLoaderData),
  });

  function leggTilBarnManuelt(barn: BarneSvar) {
    form.setValue("barnLagtManuelt", [
      ...(form.value("barnLagtManuelt") ?? []),
      {
        fornavnOgMellomnavn: barn.fornavnOgMellomnavn!!,
        etternavn: barn.etternavn!!,
        fodselsnummer: barn.fodselsnummer!!,
        hvilketLandBarnetBorI: barn.hvilketLandBarnetBorI,
      },
    ]);
    setVisLeggTilModal(false);
  }

  function redigereBarnManuelt(barn: BarneSvar, index: number) {
    const eksisterendeBarn = form.value("barnLagtManuelt") as BarneSvar[];
    if (eksisterendeBarn && eksisterendeBarn[index]) {
      eksisterendeBarn[index] = {
        ...eksisterendeBarn[index],
        ...barn,
      };
      form.setValue("barnLagtManuelt", eksisterendeBarn);
    }
    setVisModal(false);
  }

  function slettBarnManuelt(index: number) {
    const eksisterendeBarn = form.value("barnLagtManuelt") as BarneSvar[];
    if (eksisterendeBarn && eksisterendeBarn[index]) {
      eksisterendeBarn.splice(index, 1);
      form.setValue("barnLagtManuelt", eksisterendeBarn);
    }
  }

  useEffect(() => {
    console.log("BarneTilleggModal ref changed, opening modal");
    ref.current?.showModal();
  }, [visModal]);

  useEffect(() => {
    console.log("BarneTilleggModal ref changed, opening modal");
    leggTilBarnRef.current?.showModal();
  }, [visLeggTilModal]);

  return (
    <Page className="brukerdialog">
      <h2>Barnetillegg</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {barnetilleggSporsmal
                .filter((sporsmal) => sporsmal.id === "barnFraPdl")
                .map((sporsmal) => {
                  if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                    return null;
                  }
                  const pdlBarn = form.value("barnFraPdl") as BarneSvar[];
                  if (!pdlBarn || pdlBarn.length === 0) {
                    return;
                  } else {
                    return pdlBarn.map((barn, index) => (
                      <Box
                        key={index}
                        background="surface-alt-3-subtle"
                        padding="4"
                        shadow="medium"
                        borderRadius="xlarge"
                      >
                        <h3 style={{ marginBottom: "5px", marginTop: "0" }}>
                          {barn.fornavnOgMellomnavn} {barn.etternavn}
                        </h3>
                        <h5 style={{ margin: "auto" }}>Født {formaterNorskDato(new Date())}</h5>
                        <p style={{ margin: "5px auto", textTransform: "uppercase" }}>
                          Bor i {barn.hvilketLandBarnetBorI}
                        </p>

                        <RadioGroup
                          legend="Forsørger du barnet?"
                          name={`barn.${index}.forsørgerDuBarnet`}
                          size="small"
                        >
                          <HStack gap="6">
                            <Radio value="ja">Ja</Radio>
                            <Radio value="nei">Nei</Radio>
                          </HStack>
                        </RadioGroup>
                      </Box>
                    ));
                  }
                })}
              {barnetilleggSporsmal
                .filter((sporsmal) => sporsmal.id === "forsørgerBarnSomIkkeVises")
                .map((sporsmal) => {
                  if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                    return null;
                  }

                  return (
                    <Sporsmal
                      key={sporsmal.id}
                      sporsmal={sporsmal}
                      formScope={form.scope(sporsmal.id as keyof BarnetilleggSvar)}
                    />
                  );
                })}
              {barnetilleggSporsmal
                .filter((sporsmal) => sporsmal.id === "barnLagtManuelt")
                .map((sporsmal) => {
                  if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                    return null;
                  }

                  const barnSvar = form.value("barnLagtManuelt") as BarneSvar[];
                  if (!barnSvar || barnSvar.length === 0) {
                    return;
                  } else {
                    return barnSvar.map((barn, index) => (
                      <Box
                        key={index}
                        background="surface-alt-3-subtle"
                        padding="4"
                        shadow="medium"
                        borderRadius="xlarge"
                      >
                        <h3 style={{ marginBottom: "5px", marginTop: "0" }}>
                          {barn.fornavnOgMellomnavn} {barn.etternavn}
                        </h3>
                        <h5 style={{ margin: "auto" }}>Født {formaterNorskDato(new Date())}</h5>
                        <p style={{ margin: "5px auto", textTransform: "uppercase" }}>
                          Bor i {barn.hvilketLandBarnetBorI}
                        </p>

                        <div>
                          <Button
                            icon={<PencilIcon />}
                            variant="secondary"
                            size="small"
                            onClick={() => {
                              setModalBarn(barn);
                              setAntallManuelleBarn(index);
                              setVisModal(true);
                            }}
                          >
                            Endre svar
                          </Button>

                          <Button
                            icon={<TrashIcon />}
                            variant="tertiary"
                            size="small"
                            onClick={() => slettBarnManuelt(index)}
                          >
                            Slett
                          </Button>
                        </div>
                      </Box>
                    ));
                  }
                })}
            </VStack>
          </Form>
          <Button
            icon={<PencilIcon />}
            variant="secondary"
            size="small"
            onClick={() => {
              setModalBarn(undefined);
              setAntallManuelleBarn(-1);
              setVisLeggTilModal(true);
            }}
          >
            Legg til barn manuelt
          </Button>
          {visModal && (
            <RedigerBarnModal
              barn={modalBarn!}
              ref={ref}
              barneSchema={barneSchema}
              redigereBarnManuelt={redigereBarnManuelt}
              index={antallManuelleBarn}
              setVisModal={setVisModal}
            />
          )}

          {visLeggTilModal && (
            <LeggTilBarnModal
              barneSchema={barneSchema}
              ref={leggTilBarnRef}
              leggTil={leggTilBarnManuelt}
              setVisLeggTilModal={setVisLeggTilModal}
            />
          )}
        </VStack>
      </VStack>
    </Page>
  );
}
