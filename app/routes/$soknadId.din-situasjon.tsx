import {Button, DatePicker, HStack, Page, Radio, RadioGroup, Textarea, useDatepicker, VStack} from "@navikt/ds-react";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import invariant from "tiny-invariant";
import {ActionFunctionArgs} from "@remix-run/node";
import {lagreSeksjon} from "~/models/lagreSeksjon.server";
import {useActionData} from "@remix-run/react";

interface Seksjon {
    mottatt: string | undefined;
    årsak: string;
    dato: Date | undefined;
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
    console.log("Skal lagre seksjon for din situasjon");
    lagreSeksjon(
        request,
        params.soknadId as string,
        "din-situasjon",
        JSON.stringify({
            mottatt: "Ja",
            årsak: "string",
            dato: new Date()
        })
    )
    console.log("Lagret seksjon for din situasjon");
}

export default function DinSituasjon() {
    const params = useParams();
    invariant(params.soknadId);

    const [knappTrykket, setKnappTrykket] = useState(false);
    const [seksjon, setSeksjon] = useState<Seksjon>({
        mottatt: undefined,
        årsak: "",
        dato: undefined
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const actionData = useActionData<typeof action>();
        if (actionData && !knappTrykket) {
            setKnappTrykket(true);
            alert(`Seksjon lagret: ${JSON.stringify(actionData)}`);
        }
    }, [knappTrykket])

    const {datepickerProps, inputProps} = useDatepicker({
        onDateChange: (date) => setSeksjon({...seksjon, dato: date})
    });

    return (
        <Page className="brukerdialog">
            <h2>Din situasjon</h2>

            <VStack gap="20">
                <VStack gap="4">
                    <RadioGroup
                        legend="Har du mottatt dagpenger fra NAV i løpet av de siste 52 ukene?"
                        value={seksjon.mottatt}
                        onChange={(value: string) => {
                            setSeksjon({mottatt: value, årsak: "", dato: undefined})
                        }}
                    >
                        <Radio value="ja">Ja</Radio>
                        <Radio value="nei">Nei</Radio>
                        <Radio value="vetikke">Vet ikke</Radio>
                    </RadioGroup>

                    {seksjon.mottatt === "ja" &&
                        <Textarea
                            label="Skriv årsaken til at dagpengene ble stanset (Maks 500 tegn)"
                            description="For eksempel om du har vært syk, på ferie, glemt å sende meldekort, vært i utdanning eller hatt foreldrepermisjon."
                            maxLength={500}
                            value={seksjon.årsak}
                            onChange={(textbox) => setSeksjon({...seksjon, årsak: textbox.target.value})}
                        />
                    }

                    {(seksjon.mottatt === "nei" || seksjon.mottatt === "vetikke") &&
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
                        <Button variant="primary"
                                onClick={() => alert(`Mottatt: ${seksjon.mottatt}, Årsak: ${seksjon.årsak}, Dato: ${seksjon.dato}`)}>
                            {"Neste steg ->"}
                        </Button>
                    </HStack>
                </div>
            </VStack>
        </Page>
    );
}