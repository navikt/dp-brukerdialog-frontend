import {Button, DatePicker, HStack, Page, Radio, RadioGroup, Textarea, useDatepicker, VStack} from "@navikt/ds-react";
import {useState} from "react";

interface Skjema {
    mottatt: string | undefined;
    årsak: string;
    dato: Date | undefined;
}

export default function DinInntekt() {
    const [skjema, setSkjema] = useState<Skjema>({
        mottatt: undefined,
        årsak: "",
        dato: undefined
    });

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: (date) => setSkjema({...skjema, dato: date})
    });

  return (
      <Page className="brukerdialog">
        <h2>Din situasjon</h2>

        <VStack gap="20">

            <VStack>
                <RadioGroup
                    legend="Har du mottatt dagpenger fra NAV i løpet av de siste 52 ukene?"
                    value={skjema.mottatt}
                    onChange={(value: string) => {setSkjema({mottatt: value, årsak: "", dato: undefined})} }
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

                { (skjema.mottatt === "nei" || skjema.mottatt === "vetikke") &&
                        <DatePicker {...datepickerProps} fromDate={new Date()} toDate={new Date("31 Dec 2025")}>
                            <DatePicker.Input
                                {...inputProps}
                                placeholder={"DD.MM.ÅÅÅÅ"}
                                label="Hvilken dato søker du dagpenger fra?"
                                description="Du kan få dagpenger fra første dag du er helt eller delvis arbeidsledig eller permittert og tidligst fra den dagen du sender inn søknaden. Datoen du søker om dagpenger fra har betydning for beregning av dagpengene dine."
                            />
                        </DatePicker>
                }

            </VStack>

            <div>
              <HStack gap="10">
                  {/*<Button variant="secondary">{"<- Forrige steg"}</Button>*/}
                <Button variant="primary" onClick={() => alert(`Mottatt: ${skjema.mottatt}, Årsak: ${skjema.årsak}, Dato: ${skjema.dato}`)}>
                    {"Neste steg ->"}
                </Button>
              </HStack>
            </div>
        </VStack>
      </Page>
  );
}