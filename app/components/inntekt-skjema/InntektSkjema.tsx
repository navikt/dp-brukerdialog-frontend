import { InformationSquareIcon, PaperplaneIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Button,
  ExpansionCard,
  HStack,
  Radio,
  RadioGroup,
  ReadMore,
  Textarea,
} from "@navikt/ds-react";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { useState } from "react";
import { z } from "zod";
import styles from "./inntektSkjema.module.css";

const validator = withZod(
  z.object({
    inntektStemmer: z.enum(["true", "false"], {
      required_error: "Du må svare på dette spørsmålet",
    }),
    begrunnelse: z.string().min(1, { message: "Du må svare på dette spørsmålet" }),
    vilSendeDokumentasjon: z.enum(["true", "false"], {
      required_error: "Du må svare på dette spørsmålet",
    }),
  })
);

export function InntektSkjema() {
  const [shouldShow, setShouldShow] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [vilSendeDokumentasjon, setVilSendeDokumentasjon] = useState(true);
  const [inntektStemmer, setInntektStemmer] = useState(false);

  function handleStemmerInntekt(val: string) {
    setShouldShow(val === "false");
    setInntektStemmer(val === "true");
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaValue(e.target.value);
  }

  function handleVilSendeDokumentasjon(val: string) {
    setVilSendeDokumentasjon(val === "true");
  }

  const form = useForm({
    validator,
  });

  return (
    <>
      <form {...form.getFormProps()}>
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

          <ReadMore header="Hva gjør du hvis inntekten din ikke stemmer?">
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
              onChange={handleTextAreaChange}
              value={textAreaValue}
              error={form.error("begrunnelse")}
            />
          )}

          {shouldShow && (
            <RadioGroup
              name="vilSendeDokumentasjon"
              legend="Ønsker du å laste opp dokumentasjon?"
              onChange={handleVilSendeDokumentasjon}
              error={form.error("vilSendeDokumentasjon")}
              className="mt-4"
            >
              <Radio value="true">Ja</Radio>
              <Radio value="false">Nei</Radio>
            </RadioGroup>
          )}
        </div>

        <ExpansionCard aria-label="Demo med ikon" className={styles.expansionCard}>
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
              For å få dagpenger må du ha hatt en inntekt på minst 186 042 kroner de siste 12
              månedene, eller minst 372 084 kroner de siste 36 månedene. <br />
              <br /> Hvis du ikke har tjent nok vil du antagelig få avslag på søknaden din om
              dagpenger.
            </BodyLong>
          </ExpansionCard.Content>
        </ExpansionCard>

        <Button
          className="mt-14"
          variant="primary"
          type="submit"
          icon={<PaperplaneIcon />}
          loading={form.formState.isSubmitting}
          iconPosition="right"
        >
          Send inn
        </Button>
      </form>
    </>
  );
}
