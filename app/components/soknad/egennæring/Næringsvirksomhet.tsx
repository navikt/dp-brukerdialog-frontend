import JaNeiFaktum from "~/components/faktum/jaNeiFaktum";
import {Alert, Button, Modal, TextField, VStack} from "@navikt/ds-react";
import {useRef, useState} from "react";
import {IEgenNæring, INæringsvirksomhet} from "~/models/egennaring.types";
import NæringsvirksomhetOppsummering from "~/components/soknad/egennæring/NæringsvirksomhetOppsummering";


interface NæringsvirksomhetProps {
    skjema: IEgenNæring,
    setSkjema: (schema: IEgenNæring) => void
}

export default function Næringsvirksomhet({skjema, setSkjema}: NæringsvirksomhetProps) {


    const egenNæringsvirksomhetRef = useRef<HTMLDialogElement>(null);
    const [næringsvirksomhet, setNæringsvirksomhet] = useState<INæringsvirksomhet>({
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
        setNæringsvirksomhet({
            organisasjonummer: "",
            antallTimerJobbetPerUkeFør: "",
            antallTimerJobbetPerUkeNå: "",
        });
    }

    return (
        <VStack gap="5">
            <JaNeiFaktum
                ledetekst={"Driver du egen næringsvirksomhet?"}
                vedEndring={(value) => {
                    setSkjema({...skjema, driverEgenNæringsvirksomhet: value})
                }}
                aktiv={true}
            />

            {
                skjema.driverEgenNæringsvirksomhet === true &&
                <>
                    <Alert contentMaxWidth={false} variant="info">Selv om du driver egen næring må du være villig til å
                        ta annet arbeid. Du må legge til organisasjonsnummer for egen næring.</Alert>
                    {
                        // eslint-disable-next-line react/jsx-key
                        skjema.egneNæringsvirksomheter.map(value => <NæringsvirksomhetOppsummering virksomhet={value}/>)
                    }
                    <Button variant={"secondary"} onClick={() => egenNæringsvirksomhetRef.current?.showModal()}>+ Legg
                        til næringsvirksomhet</Button>
                </>
            }

            <Modal ref={egenNæringsvirksomhetRef} header={{heading: "Legg til næringsvirksomhet"}} width={600}>
                <Modal.Body>
                    <form method="dialog" id="egenNæringsvirksomhet" onSubmit={() => {
                        leggTilNæringsvirksomhet()
                    }}>
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
                                        antallTimerJobbetPerUkeFør: value.target.value
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
                                        antallTimerJobbetPerUkeNå: value.target.value
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
    );
}