import { Radio, RadioGroup, ReadMore, Textarea } from "@navikt/ds-react";
import styles from "./InntektSkjema.module.css";
import { useState } from "react";

export function InntektSkjema() {
  const [showTextArea, setShowTextArea] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  function handleRadioChange(val: string) {
    setShowTextArea(val === "false");
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaValue(e.target.value);
  }

  return (
    <div className="card">
      <form>
        <RadioGroup legend="Stemmer den samlede inntekten?" onChange={handleRadioChange}>
          <Radio value="true">Ja</Radio>
          <Radio value="false">Nei</Radio>
        </RadioGroup>
      </form>

      <ReadMore header="Hva gjør du hvis inntekten din ikke stemmer?">
        Hvis opplysningene om inntekten din ikke stemmer, må du ta kontakt med arbeidsgiveren din.
        Arbeidsgiver sender hver måned opplysninger om inntekten din til Skatteetaten. Det er bare
        arbeidsgiver, som har rapportert inntektsopplysningene, som kan gjøre endringer og rette
        opplysningene.
        <br /> <br />
        Har du alternativ dokumentasjon som kan bekrefte at du har tjent mer, det kan for eksempel
        være lønnslipper eller årsoppgaven, last det opp her.
      </ReadMore>

      {showTextArea && (
        <Textarea
          className={styles.textarea}
          label="Hva er feil med inntekten?"
          description="Beskriv hva som er feil med inntekten din."
          onChange={handleTextAreaChange}
          value={textAreaValue}
        />
      )}
    </div>
  );
}
