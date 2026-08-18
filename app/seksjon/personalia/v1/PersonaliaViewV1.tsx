import { BodyLong, BodyShort, Heading, Label, LocalAlert, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { EksterneLenke } from "~/components/EksterneLenke";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { action, loader } from "~/routes/$soknadId.personalia";
import { personaliaSchema } from "~/seksjon/personalia/v1/personalia.schema";
import { useSoknad } from "~/seksjon/soknad.context";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { validerSvar } from "~/utils/validering.utils";
import type { PersonaliaSvar } from "./personalia.komponenter";
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
  lagPersonaliaBostedslandKomponenter,
  lagPersonaliaKomponenter,
  landFraPdl,
  landkodeFraPdl,
  mellomnavnFraPdl,
  pdfGrunnlag,
  postnummerFraPdl,
  poststedFraPdl,
} from "./personalia.komponenter";

export function PersonaliaViewV1() {
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const { t } = useVersjonertTranslation("personalia", 1);
  const { setKomponentIdTilFokus, økeSubmitTeller } = useSoknad();
  const { seksjon, personalia } = loaderData;
  const actionData = useActionData<typeof action>();
  const personaliaKomponenter = lagPersonaliaKomponenter(t);
  const personaliaBostedslandKomponenter = lagPersonaliaBostedslandKomponenter(t);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: personaliaSchema,
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<PersonaliaSvar>(form, personaliaBostedslandKomponenter);

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

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();

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

  async function lagreSvar() {
    const klarTilLagring = await validerSvar(form, økeSubmitTeller, setKomponentIdTilFokus);

    if (klarTilLagring) {
      const pdfPayload = {
        navn: t("side.overskrift"),
        spørsmål: [
          ...lagSeksjonPayload(personaliaKomponenter, form.transient.value()),
          ...lagSeksjonPayload(personaliaBostedslandKomponenter, form.transient.value()),
        ],
      };
      form.setValue(handling, Seksjonshandling.neste);
      form.setValue(pdfGrunnlag, JSON.stringify(pdfPayload));
      form.submit();
    }
  }

  function mellomlagreSvar() {
    const pdfPayload = {
      navn: t("side.overskrift"),
      spørsmål: [
        ...lagSeksjonPayload(personaliaKomponenter, form.transient.value()),
        ...lagSeksjonPayload(personaliaBostedslandKomponenter, form.transient.value()),
      ],
    };

    form.setValue(pdfGrunnlag, JSON.stringify(pdfPayload));
    form.setValue(handling, Seksjonshandling.fortsettSenere);
    form.submit();
  }

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
            <Label as="p">{t("opplysninger.fødselsnummer")}</Label>
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
        <Form id={formId} action={formAction}>
          <input type="hidden" name="versjon" value={seksjon.versjon} />
          <VStack gap="space-24">
            {personaliaKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(formValues)) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formValues={formValues}
                  formScope={form.scope(komponent.id as keyof PersonaliaSvar)}
                />
              );
            })}

            {personaliaBostedslandKomponenter.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(formValues)) {
                return null;
              }

              return (
                <Komponent
                  key={spørsmål.id}
                  props={spørsmål}
                  formValues={formValues}
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
