import {Alert, Button, Modal, Page, TextField, VStack} from "@navikt/ds-react";
import {useRef, useState} from "react";
import JaNeiFaktum from "~/components/faktum/jaNeiFaktum";

interface EgenNæring {
    driverEgenNæringsvirksomhet?: boolean;
    driverEgetGårdsbruk?: boolean;
    egneNæringsvirksomheter?: Næringsvirksomhet[];
}

interface Næringsvirksomhet {
    organisasjonummer?: string
    antallTimerJobbetPerUkeFør?: number
    antallTimerJobbetPerUkeNå?: number
}

export default function EgenNæring() {
    const egenNæringsvirksomhetRef = useRef<HTMLDialogElement>(null);

    const [skjema, setSkjema] = useState<EgenNæring>({
        driverEgenNæringsvirksomhet: undefined,
        driverEgetGårdsbruk: undefined,
    });

    const [næringsvirksomhet, setNæringsvirksomhet] = useState<Næringsvirksomhet>({
        organisasjonummer: undefined,
        antallTimerJobbetPerUkeFør: undefined,
        antallTimerJobbetPerUkeNå: undefined,
    });

    function leggTilNæringsvirksomhet() {
        const næringsvirksomheter = skjema.egneNæringsvirksomheter;
        næringsvirksomheter?.push({
            organisasjonummer: næringsvirksomhet.organisasjonummer,
            antallTimerJobbetPerUkeFør: næringsvirksomhet.antallTimerJobbetPerUkeFør,
            antallTimerJobbetPerUkeNå: næringsvirksomhet.antallTimerJobbetPerUkeNå,
        })
        setSkjema({...skjema, egneNæringsvirksomheter: næringsvirksomheter})
        setNæringsvirksomhet({});
    }

    return (
        <Page className="brukerdialog">
            <VStack gap="10">

                <JaNeiFaktum
                    ledetekst={"Driver du egen næringsvirksomhet?"}
                    vedEndring={(value) => {
                        setSkjema({...skjema, driverEgenNæringsvirksomhet: value})
                    }}
                    aktiv={true}
                />

                <JaNeiFaktum
                    ledetekst={"Driver du eget gårdsbruk?"}
                    vedEndring={(value) => {
                        setSkjema({...skjema, driverEgetGårdsbruk: value})
                    }}
                    aktiv={skjema.driverEgenNæringsvirksomhet === false}
                />

                {
                    skjema.driverEgenNæringsvirksomhet === true &&
                    <>
                        <Alert contentMaxWidth={false} variant="info">Selv om du driver egen næring må du være villig til å ta annet arbeid. Du må legge til organisasjonsnummer for egen næring.</Alert>
                        <Button variant={"secondary"} onClick={() => egenNæringsvirksomhetRef.current?.showModal()}>+ Legg til næringsvirksomhet</Button>
                    </>
                }

                {
                    // List næringsvirksomheter
                }

                <Modal ref={egenNæringsvirksomhetRef} header={{heading: "Legg til næringsvirksomhet"}} width={600}>
                    <Modal.Body>
                        <form method="dialog" id="egenNæringsvirksomhet" onSubmit={() => {leggTilNæringsvirksomhet()}}>
                            <TextField
                                name="organisasjonsnummer"
                                value={næringsvirksomhet.organisasjonummer}
                                label="Næringens organisasjonsnummer"
                                onChange={(value) => {
                                    setNæringsvirksomhet({
                                        ...næringsvirksomhet,
                                        organisasjonummer: value.target.value
                                    })
                                }}/>

                            {
                                næringsvirksomhet.organisasjonummer &&
                                <TextField
                                    name="antallTimerJobbetPerUkeFør"
                                    value={næringsvirksomhet.antallTimerJobbetPerUkeFør}
                                    label="Skriv inn hvor mange timer du jobbet per uke i egen næring før arbeidstiden ble redusert"
                                    onChange={(value) => {
                                        setNæringsvirksomhet({
                                            ...næringsvirksomhet,
                                            antallTimerJobbetPerUkeFør: +value.target.value
                                        })
                                    }}
                                />
                            }

                            {
                                næringsvirksomhet.antallTimerJobbetPerUkeFør &&
                                <TextField
                                    name="antallTimerJobbetPerUkeFørNå"
                                    value={næringsvirksomhet.antallTimerJobbetPerUkeNå}
                                    label="Skriv inn hvor mange timer du jobber per uke i egen næring nå"
                                    description="For å vurdere om du har rett til dagpenger, må vi vite din nåværende ukentlige arbeidstid. Hvis du jobber mer enn 50 prosent av den totale arbeidstiden du hadde før, har du ikke rett til dagpenger. Hvis arbeidstiden din i egen næring ikke er redusert, kan du skrive inn samme antall timer som i spørsmålet over."
                                    onChange={(value) => {
                                        setNæringsvirksomhet({
                                            ...næringsvirksomhet,
                                            antallTimerJobbetPerUkeNå: +value.target.value
                                        })
                                    }}
                                />
                            }

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button form="egenNæringsvirksomhet">Lagre og lukk</Button>
                    </Modal.Footer>
                </Modal>

            </VStack>
        </Page>
    );
}