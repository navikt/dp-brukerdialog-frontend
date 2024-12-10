import { Button, Radio, RadioGroup, ReadMore, Textarea } from "@navikt/ds-react";
import { useState } from "react";
import { z } from "zod";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import styles from "./InntektSkjema.module.css";

const validator = withZod(
  z.object({
    radio: z.enum(["true", "false"], {
      required_error: "Du må svare på dette spørsmålet",
    }),
    textarea: z.string().min(1, { message: "Du må svare på dette spørsmålet" }),
  })
);

export function InntektSkjema() {
  const [showTextArea, setShowTextArea] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  function handleRadioChange(val: string) {
    setShowTextArea(val === "false");
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaValue(e.target.value);
  }

  const form = useForm({
    validator,
  });

  return (
    <>
      <form {...form.getFormProps()}>
        <div className="card">
          <RadioGroup
            name="radio"
            legend="Stemmer den samlede inntekten?"
            onChange={handleRadioChange}
            error={form.error("radio")}
            className={styles.radioGroup}
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

          {showTextArea && (
            <Textarea
              name="textarea"
              className={styles.textarea}
              label="Hva er feil med inntekten?"
              description="Beskriv hva som er feil med inntekten din."
              onChange={handleTextAreaChange}
              value={textAreaValue}
              error={form.error("textarea")}
            />
          )}
        </div>

        <div className="button-container">
          <Button variant="secondary" icon={<ArrowLeftIcon />}>
            Avbryt
          </Button>
          <Button
            variant="primary"
            type="submit"
            icon={<ArrowRightIcon />}
            loading={form.formState.isSubmitting}
          >
            Lagre
          </Button>
        </div>
      </form>
    </>
  );
}
