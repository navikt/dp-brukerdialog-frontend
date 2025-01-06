import { InformationSquareIcon, PaperplaneIcon } from "@navikt/aksel-icons";
import {
  Alert,
  BodyLong,
  Button,
  ExpansionCard,
  HStack,
  Radio,
  RadioGroup,
  ReadMore,
  Textarea,
} from "@navikt/ds-react";
import { Form, useActionData } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import classNames from "classnames";
import { useState } from "react";
import { action, validator } from "~/routes/$soknadId._index";
import { getJouralforingPdfHtml } from "~/utils/journalforing.utils";

import styles from "./inntektSkjema.module.css";

export function InntektSkjema() {
  const [shouldShow, setShouldShow] = useState(false);
  const data = useActionData<typeof action>();

  function handleStemmerInntekt(val: string) {
    setShouldShow(val === "false");
  }

  const form = useForm({
    method: "post",
    validator,
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onSubmit",
    },
  });

  function handleOnClick() {
    const journalforingPdfHtml = getJouralforingPdfHtml();

    const hiddenInput = document.querySelector('input[name="pdfHtml"]') as HTMLInputElement | null;

    if (hiddenInput) {
      hiddenInput.value = journalforingPdfHtml ?? "";
    }

    form.submit();
  }

  return (
    <Form {...form.getFormProps()}>
      <div>
        <div className="card">
          <RadioGroup
            name="inntektStemmer"
            legend="Stemmer den samlede inntekten?"
            onChange={handleStemmerInntekt}
            error={form.error("inntektStemmer")}
          >
            <Radio value="true">Ja</Radio>
            <Radio value="false">Nei</Radio>
          </RadioGroup>

          <ReadMore header="Hva gjør du hvis inntekten din ikke stemmer?" className="readmore--pdf">
            Hvis opplysningene om inntekten din ikke stemmer, må du ta kontakt med arbeidsgiveren
            din. Arbeidsgiver sender hver måned opplysninger om inntekten din til Skatteetaten. Det
            er bare arbeidsgiver, som har rapportert inntektsopplysningene, som kan gjøre endringer
            og rette opplysningene.
            <br /> <br />
            Har du alternativ dokumentasjon som kan bekrefte at du har tjent mer, det kan for
            eksempel være lønnslipper eller årsoppgaven, last det opp her.
          </ReadMore>

          {shouldShow && (
            <Textarea
              name="begrunnelse"
              className="mt-4"
              label="Hva er feil med inntekten?"
              description="Beskriv hva som er feil med inntekten din."
              error={form.error("begrunnelse")}
            />
          )}

        </div>

        <ExpansionCard
          aria-label="Krav om inntekt expansion kort"
          className={classNames(styles.expansionCard, "expansion-card--pdf")}
        >
          <ExpansionCard.Header>
            <HStack wrap={false} gap="4" align="center">
              <div aria-hidden>
                <InformationSquareIcon aria-hidden fontSize="3rem" />
              </div>
              <div>
                <ExpansionCard.Title as="h3" size="small">
                  Krav om inntekt
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                  Dette er ett av flere krav som må være oppfylt for å få dagpenger.
                </ExpansionCard.Description>
              </div>
            </HStack>
          </ExpansionCard.Header>
          <ExpansionCard.Content>
            <BodyLong>
              For å få dagpenger må du ha hatt en inntekt på minst 186 042 kroner de siste 12
              månedene, eller minst372 084kroner de siste 36 månedene. <br />
              <br /> Hvis du ikke har tjent nok vil du antagelig få avslag på søknaden din om
              dagpenger.
            </BodyLong>
          </ExpansionCard.Content>
        </ExpansionCard>

        <input type="hidden" name="pdfHtml" />

        {data?.postForeleggingResponse?.status === "error" && (
          <Alert variant="error" className="mt-8">
            {data.postForeleggingResponse.error?.statusText}
          </Alert>
        )}

        <Button
          className="mt-14 sendinn-button--pdf"
          variant="primary"
          type="button"
          icon={<PaperplaneIcon />}
          loading={form.formState.isSubmitting}
          iconPosition="right"
          onClick={handleOnClick}
        >
          Send inn
        </Button>
      </div>
    </Form>
  );
}
