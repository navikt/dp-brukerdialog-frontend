import {Button, Modal, Page, TextField, VStack} from "@navikt/ds-react";
import {useRef, useState} from "react";
import JaNeiFaktum from "~/components/faktum/jaNeiFaktum";
import {FloppydiskIcon, PersonPlusIcon} from "@navikt/aksel-icons";

interface IBarnetillegg {
    barn?: IBarn[]
    forsørgerBarnSomIkkeLiggerIPdl?: boolean
}

interface IBarn {
    fornavnOgMellomnavn?: string
    etternavn?: string
    fødselsdato?: Date
    land?: string
    forsørgerDuBarnet?: boolean
    hentetFraPdl?: boolean
}

export default function Barntillegg() {
    const barnModalRef = useRef<HTMLDialogElement>(null);

    const [barnetillegg, setBarnetillegg] = useState<IBarnetillegg>({
        barn: [],
        forsørgerBarnSomIkkeLiggerIPdl: undefined
    });

    const [barn, setBarn] = useState<IBarn>({
        fornavnOgMellomnavn: undefined,
        etternavn: undefined,
        fødselsdato: undefined,
        land: undefined,
        forsørgerDuBarnet: undefined,
        hentetFraPdl: undefined
    });

    return (
        <Page className="brukerdialog">
            <VStack>
                <h2>Barnetillegg</h2>
                <div>
                    <p>Hvis du forsørger barn under 18 år, eller er bidragspliktig, kan du få barnetillegg uavhengig av
                        om barnet bor hos deg.</p>
                    <p>Barnet må være bosatt i Norge, et annet EØS-land, Sveits eller Storbritannia. Du får ikke
                        barnetillegg hvis barnet oppholder seg utenfor disse områdene mer enn 90 dager i løpet av 12
                        måneder.</p>
                    <p>Hvis vi har registrert noen barn på deg vises de under.</p>
                </div>
                <JaNeiFaktum
                    ledetekst="Forsørger du barn som ikke vises her?"
                    beskrivelse="Hvis du har forsørgeransvar for barn under 18 år som ikke vises her, kan du legge dem til."
                    verdi={barnetillegg.forsørgerBarnSomIkkeLiggerIPdl}
                    vedEndring={(value: boolean) => {
                        setBarnetillegg({...barnetillegg, forsørgerBarnSomIkkeLiggerIPdl: value})
                    }}
                    aktiv={true}
                />

                {
                    barnetillegg.forsørgerBarnSomIkkeLiggerIPdl === true &&
                    <Button variant="secondary" icon={<PersonPlusIcon aria-hidden/>}
                            onClick={() => barnModalRef.current?.showModal()}>Legg til barn</Button>
                }

                <Modal ref={barnModalRef} header={{ heading: "Legg til barn", icon: <PersonPlusIcon aria-hidden/> }} width={600}>
                    <Modal.Body>
                        <form method="dialog" id="barn" onSubmit={(value) => {
                            console.info(value)
                        }}>
                            <TextField
                                value={barn.fornavnOgMellomnavn}
                                label="Fornavn og mellomnavn"
                                onChange={(value) => {
                                    setBarn({
                                        ...barn,
                                        fornavnOgMellomnavn: value.target.value
                                    })
                                }}/>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" icon={<FloppydiskIcon aria-hidden/>}
                                onClick={() => barnModalRef.current?.close()}>
                            Lagre og lukk
                        </Button>
                    </Modal.Footer>
                </Modal>

            </VStack>
        </Page>
    );
}
