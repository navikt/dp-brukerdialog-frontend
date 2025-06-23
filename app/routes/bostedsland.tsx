import {DatePicker, Page, Select, TextField, useDatepicker, VStack} from "@navikt/ds-react";
import {useState} from "react";
import JaNeiFaktum from "~/components/faktum/jaNeiFaktum";

interface BostedsSkjema {
    bostedsland?: string;
    reistTilbake?: boolean;
    reistHjemMinstEnGangIUken?: boolean;
    reistHjemRotasjon?: boolean;
    avreiseFraDato: Date | undefined;
    avreiseTilDato: Date | undefined;
    reisteFraBegrunnelse?: string;
}

export default function Bostedsland() {
    const [skjema, setSkjema] = useState<BostedsSkjema>({
        bostedsland: undefined,
        reistTilbake: undefined,
        reistHjemMinstEnGangIUken: undefined,
        reistHjemRotasjon: undefined,
        avreiseFraDato: undefined,
        avreiseTilDato: undefined,
        reisteFraBegrunnelse: undefined
    });

    const fraDato = useDatepicker({
        onDateChange: (date) => setSkjema({...skjema, avreiseFraDato: date})
    });

    const tilDato = useDatepicker({
        onDateChange: (date) => setSkjema({...skjema, avreiseTilDato: date})
    });

    return (
        <main id="maincontent" tabIndex={-1}>
            <Page className="brukerdialog">
                <VStack gap="6">
                    <h2>Bostedsland</h2>
                    <Select
                        label="Hvilket land bor du i?"
                        description="Med bostedsland mener vi ditt vanlige oppholdssted, som er der du eier eller leier bolig og tilbringer mesteparten av tiden din. Du må som hovedregel oppholde deg i Norge for å ha rett til dagpenger fra Norge."
                        value={skjema.bostedsland}
                        onChange={(value) => {
                            setSkjema({...skjema, bostedsland: value.target.value})
                        }}
                    >
                        <option value="">- Velg land -</option>
                        <option value="norge">Norge</option>
                        <option value="sverige">Sverige</option>
                        <option value="danmark">Danmark</option>
                    </Select>

                    {(!!skjema.bostedsland && skjema.bostedsland !== "norge") && (
                        <VStack gap="6">
                            <JaNeiFaktum
                                ledetekst="Har du reist tilbake til bostedslandet ditt etter at du ble arbeidsledig eller permittert?"
                                verdi={skjema.reistTilbake}
                                vedEndring={(value: boolean) => {
                                    setSkjema({...skjema, reistTilbake: value})
                                }}
                                aktiv={true}
                            />

                            {
                                skjema.reistTilbake === true && (
                                    <VStack gap="6">
                                        <div className="min-h-96">
                                            <DatePicker {...fraDato.datepickerProps}>
                                                <DatePicker.Input {...fraDato.inputProps} label="Velg dato"/>
                                            </DatePicker>
                                        </div>
                                        <div className="min-h-96">
                                            <DatePicker {...tilDato.datepickerProps}>
                                                <DatePicker.Input {...tilDato.inputProps} label="Velg dato"/>
                                            </DatePicker>
                                        </div>
                                        <TextField label={"Hvorfor reiste du fra Norge"}
                                                   value={skjema.reisteFraBegrunnelse}
                                                   onChange={(textbox) => setSkjema({
                                                       ...skjema,
                                                       reisteFraBegrunnelse: textbox.target.value
                                                   })}/>

                                    </VStack>
                                )
                            }

                            {
                                <JaNeiFaktum
                                    ledetekst="Reiste du hjem til landet du bor i en gang i uken eller mer, mens du jobbet i Norge?"
                                    verdi={skjema.reistHjemMinstEnGangIUken}
                                    vedEndring={(value: boolean) => {
                                        setSkjema({...skjema, reistHjemMinstEnGangIUken: value})
                                    }}
                                    aktiv={skjema.reistTilbake === false || (
                                        skjema.reistTilbake === true &&
                                        skjema.avreiseFraDato !== undefined &&
                                        skjema.avreiseTilDato !== undefined &&
                                        skjema.reisteFraBegrunnelse !== undefined && skjema.reisteFraBegrunnelse !== "")}
                                />
                            }

                            {
                                <JaNeiFaktum
                                    ledetekst="Reiste du i takt med rotasjon?"
                                    verdi={skjema.reistHjemRotasjon}
                                    vedEndring={(value: boolean) => {
                                        setSkjema({...skjema, reistHjemRotasjon: value})
                                    }}
                                    aktiv={skjema.reistHjemMinstEnGangIUken === false}
                                />
                            }

                        </VStack>
                    )}
                </VStack>
            </Page>
        </main>
    );
}