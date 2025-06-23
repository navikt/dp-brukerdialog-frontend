import {Button, HStack, Page, Radio, RadioGroup, Textarea, VStack} from "@navikt/ds-react";
import {useState} from "react";

interface skjema {
    mottatt: string | undefined;
    årsak: string;
}

export default function DinInntekt() {
    const [skjema, setSkjema] = useState<skjema>({
        mottatt: "ja",
        årsak: ""
    });

  return (
      <Page className="brukerdialog">
        <h2>Din situasjon</h2>

        <VStack gap="20">

            <VStack>
                <RadioGroup
                    legend="Har du mottatt dagpenger?"
                    value={skjema.mottatt}
                    onChange={(value: string) => {setSkjema({mottatt: value, årsak: ""})} }
                >
                  <Radio value="ja">Ja</Radio>
                  <Radio value="nei">Nei</Radio>
                  <Radio value="vetikke">Vet ikke</Radio>
                </RadioGroup>

                { skjema.mottatt === "ja" &&
                    <Textarea
                        label="Skriv årsaken til at dagpengene ble stanset (Maks 500 tegn)"
                        description="For eksempel om du har vært syk, på ferie, glemt å sende meldekort, vært i utdanning eller hatt foreldrepermisjon."
                        maxLength={500}
                        value={skjema.årsak}
                        onChange={(textbox) => setSkjema({...skjema, årsak: textbox.target.value})}
                    />
                }

            </VStack>

            <div>
              <HStack gap="10">
                <Button variant="secondary">{"<- Forrige steg"}</Button>
                <Button variant="primary" onClick={() => alert(`Mottatt: ${skjema.mottatt}, Årsak: ${skjema.årsak}`)}>
                    {"Neste steg ->"}
                </Button>
              </HStack>
            </div>
        </VStack>
      </Page>
  );
}