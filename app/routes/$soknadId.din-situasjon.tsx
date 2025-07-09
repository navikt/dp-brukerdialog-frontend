import {Button, DatePicker, HStack, Page, Radio, RadioGroup, Textarea, useDatepicker, VStack} from "@navikt/ds-react";
import {useNavigate, useParams, Form } from "react-router";
import invariant from "tiny-invariant";
import {z} from "zod";
import {useState} from "react";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {useForm} from "@rvf/react-router";

interface Seksjon {
    mottatt: string | undefined;
    årsak: string;
    dato: Date | undefined;
}

export default function DinSituasjon() {
    const params = useParams();
    invariant(params.soknadId);

    const [seksjon, setSeksjon] = useState<Seksjon>({
        mottatt: "",
        årsak: "",
        dato: undefined
    });

    const form = useForm(
        {
            schema: z.object({
                mottatt: z.enum(["ja", "nei", "vetikke"], {
                    required_error: "Du må svare på dette spørsmålet"
                }),
                årsak: z.string().max(500, "Maks 500 tegn").optional(),
                dato: z.date().optional()
            }),
            submitSource: "state",
            action: "/$soknadId/din-situasjon/action",
            validationBehaviorConfig: {
                initial: "onChange",
                whenTouched: "onChange",
                whenSubmitted: "onChange",
            },
            method: "post",
            defaultValues: {
                mottatt: "ja",
                årsak: undefined,
                dato: undefined
            }
        }
    )
    const navigate = useNavigate();

    const {datepickerProps, inputProps} = useDatepicker({
        onDateChange: (date) => setSeksjon({...seksjon, dato: date})
    });

    async function handleSubmit() {
        await form.submit()
        navigate("/barnetillegg")
    }

    return (
        <Page className="brukerdialog">
            <h2>Din situasjon</h2>

            <VStack gap="20">
                <VStack gap="6">
                    <Form {...form.getFormProps()}>
                        <RadioGroup
                            legend="Har du mottatt dagpenger fra NAV i løpet av de siste 52 ukene?"
                            value={seksjon.mottatt}
                            onChange={(value: string) => {
                                setSeksjon({mottatt: value, årsak: "", dato: undefined})
                            }}
                        >
                            <Radio value="ja" name="mottatt">Ja</Radio>
                            <Radio value="nei" name="mottatt">Nei</Radio>
                            <Radio value="vetikke" name="mottatt">Vet ikke</Radio>
                        </RadioGroup>

                        {seksjon.mottatt === "ja" &&
                            <Textarea
                                label="Skriv årsaken til at dagpengene ble stanset (Maks 500 tegn)"
                                description="For eksempel om du har vært syk, på ferie, glemt å sende meldekort, vært i utdanning eller hatt foreldrepermisjon."
                                maxLength={500}
                                value={seksjon.årsak}
                                name="årsak"
                                onChange={(textbox) => setSeksjon({...seksjon, årsak: textbox.target.value})}
                            />
                        }

                        {(seksjon.mottatt === "nei" || seksjon.mottatt === "vetikke") &&
                            <DatePicker {...datepickerProps} fromDate={new Date()} toDate={new Date("31 Dec 2025")}>
                                <DatePicker.Input
                                    {...inputProps}
                                    placeholder={"DD.MM.ÅÅÅÅ"}
                                    label="Hvilken dato søker du dagpenger fra?"
                                    name="dato"
                                    description="Du kan få dagpenger fra første dag du er helt eller delvis arbeidsledig eller permittert og tidligst fra den dagen du sender inn søknaden. Datoen du søker om dagpenger fra har betydning for beregning av dagpengene dine."
                                />
                            </DatePicker>
                        }

                        <Button variant="primary" onClick={handleSubmit} iconPosition="right" icon={<ArrowRightIcon/>}>
                            Neste steg
                        </Button>
                    </Form>
                </VStack>

                <div>
                    <HStack gap="10">
                        {/*<Button variant="secondary">{"<- Forrige steg"}</Button>*/}

                    </HStack>
                </div>
            </VStack>
        </Page>
    );
}