import { useTranslation } from "react-i18next";
import { BodyLong, BodyShort, Heading, Label, LocalAlert, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useMemo } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { EksterneLenke } from "~/components/EksterneLenke";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.personalia";
import {
  adresselinje1FraPdl,
  adresselinje2FraPdl,
  adresselinje3FraPdl,
  alderFraPdl,
  etternavnFraPdl,
  fornavnFraPdl,
  fødselsnummerFraPdl,
  handling,
  kontonummerFraKontoregister,
  landFraPdl,
  landkodeFraPdl,
  lagPersonaliaBostedslandSpørsmål,
  lagPersonaliaSpørsmål,
  mellomnavnFraPdl,
  pdfGrunnlag,
  postnummerFraPdl,
  poststedFraPdl,
} from "~/seksjon/personalia/v1/personalia.komponenter";
import type { PersonaliaSvar } from "~/seksjon/personalia/v1/personalia.komponenter";
import { personaliaSchema } from "~/seksjon/personalia/v1/personalia.schema";
import { useSoknad } from "~/seksjon/soknad.context";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { validerSvar } from "~/utils/validering.utils";

export function PersonaliaViewV1() {
  const { t } = useTranslation("personalia");
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const { setKomponentIdTilFokus, økeSubmitTeller } = useSoknad();
  const { seksjon, personalia } = loaderData;
  const actionData = useActionData<typeof action>();

  const personaliaSpørsmål = useMemo(() => lagPersonaliaSpørsmål(t), [t]);

  const personaliaBostedslandSpørsmål = useMemo(() => lagPersonaliaBostedslandSpørsmål(t), [t]);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: personaliaSchema,
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<PersonaliaSvar>(form, personaliaBostedslandSpørsmål);

  function genererPdfPayload() {
    return {
      navn: t("side.overskrift"),
      spørsmål: [
        ...lagSeksjonPayload(personaliaSpørsmål, form.transient.value()),
        ...lagSeksjonPayload(personaliaBostedslandSpørsmål, form.transient.value()),
      ],
    };
  }

  async function lagreSvar() {
    const klarTilLagring = await validerSvar(form, økeSubmitTeller, setKomponentIdTilFokus);

    if (klarTilLagring) {
      form.setValue(handling, Seksjonshandling.neste);
      form.setValue(pdfGrunnlag, JSON.stringify(genererPdfPayload()));
      form.submit();
    }
  }

  function mellomlagreSvar() {
    form.setValue(pdfGrunnlag, JSON.stringify(genererPdfPayload()));
    form.setValue(handling, Seksjonshandling.fortsettSenere);
    form.submit();
  }

  if (!personalia) {
    return (
      <div className="innhold">
        <title>{t("side.tittel")}</title>
        <VStack gap="space-24">
          <Heading size="medium" level="2">
            {t("side.overskrift")}
          </Heading>
          <LocalAlert status="error">
            <LocalAlert.Header>
              <LocalAlert.Title>{t("tekniskFeil.tittel")}</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>{t("personaliaIkkeHentet.beskrivelse")}</LocalAlert.Content>
          </LocalAlert>
        </VStack>
        <SøknadFooter onFortsettSenere={mellomlagreSvar} />
      </div>
    );
  }

  const { fornavn, mellomnavn, etternavn, ident, alder, folkeregistrertAdresse } =
    personalia.person;

  const formattertIdent = ident.replace(/(.{6})(.{5})/, `$1 $2`);
  const formattertKontonummer = personalia.kontonummer?.replace(/(.{4})(.{2})(.{5})/, "$1 $2 $3");

  form.setValue(fornavnFraPdl, fornavn || "");
  form.setValue(mellomnavnFraPdl, mellomnavn || "");
  form.setValue(etternavnFraPdl, etternavn || "");
  form.setValue(fødselsnummerFraPdl, ident || "");

  if (folkeregistrertAdresse) {
    form.setValue(adresselinje1FraPdl, folkeregistrertAdresse.adresselinje1 || "");
    form.setValue(adresselinje2FraPdl, folkeregistrertAdresse.adresselinje2 || "");
    form.setValue(adresselinje3FraPdl, folkeregistrertAdresse.adresselinje3 || "");
    form.setValue(postnummerFraPdl, folkeregistrertAdresse.postnummer || "");
    form.setValue(poststedFraPdl, folkeregistrertAdresse.poststed || "");
    form.setValue(landkodeFraPdl, folkeregistrertAdresse.landkode || "");
    form.setValue(landFraPdl, folkeregistrertAdresse.land || "");
  }

  form.setValue(alderFraPdl, alder?.toString() || "");
  form.setValue(kontonummerFraKontoregister, personalia.kontonummer || "");

  return (
    <div className="innhold">
      <title>{t("side.tittel")}</title>
      <VStack gap="space-24">
        <Heading size="medium" level="2">
          {t("side.overskrift")}
        </Heading>
        <BodyLong>
          {t("intro.forLenke")}{" "}
          <EksterneLenke href="https://www.nav.no/minside" tekst={t("intro.minSideLenke")} />
        </BodyLong>

        <VStack gap="space-24">
          <VStack>
            <Label as="p">{t("opplysninger.navn")}</Label>
            <BodyShort>
              {fornavn} {mellomnavn} {etternavn}
            </BodyShort>
          </VStack>
          <VStack>
            <Label as="p">{t("opplysninger.fodselsnummer")}</Label>
            <BodyShort>{formattertIdent}</BodyShort>
          </VStack>
          <VStack>
            <Label as="p">{t("opplysninger.alder")}</Label>
            <BodyShort>{alder}</BodyShort>
          </VStack>
          {folkeregistrertAdresse && (
            <VStack>
              <Label as="p">{t("opplysninger.folkeregistrertAdresse")}</Label>
              <BodyShort>
                {folkeregistrertAdresse.adresselinje1}{" "}
                {folkeregistrertAdresse.adresselinje1 && <br />}
                {folkeregistrertAdresse.adresselinje2}{" "}
                {folkeregistrertAdresse.adresselinje2 && <br />}
                {folkeregistrertAdresse.adresselinje3}{" "}
                {folkeregistrertAdresse.adresselinje3 && <br />}
                {folkeregistrertAdresse.postnummer} {folkeregistrertAdresse.poststed}{" "}
                {folkeregistrertAdresse.land && <br />}
                {folkeregistrertAdresse.land}
              </BodyShort>
            </VStack>
          )}
          <VStack>
            <Label as="p">{t("opplysninger.kontonummer")}</Label>
            <BodyShort>
              {formattertKontonummer || (
                <span>
                  {t("opplysninger.manglerKontonummer.forLenke")}{" "}
                  <EksterneLenke
                    href="https://www.nav.no/minside"
                    tekst={t("opplysninger.manglerKontonummer.minSideLenke")}
                  />
                  .
                </span>
              )}
            </BodyShort>
          </VStack>
        </VStack>

        <Form {...form.getFormProps()}>
          <input type="hidden" name="versjon" value={seksjon.versjon} />
          <VStack gap="space-24">
            {personaliaSpørsmål.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formValues={form.value()}
                  formScope={form.scope(komponent.id as keyof PersonaliaSvar)}
                />
              );
            })}

            {personaliaBostedslandSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={spørsmål.id}
                  props={spørsmål}
                  formValues={form.value()}
                  formScope={form.scope(spørsmål.id as keyof PersonaliaSvar)}
                />
              );
            })}

            {actionData && (
              <SeksjonTekniskFeil tittel={t("tekniskFeil.tittel")} beskrivelse={actionData.error} />
            )}
          </VStack>
        </Form>
      </VStack>

      <SeksjonNavigasjon
        onNesteSteg={lagreSvar}
        lagrer={state === "submitting" || state === "loading"}
      />

      <SøknadFooter onFortsettSenere={mellomlagreSvar} />
    </div>
  );
}
