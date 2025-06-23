import {DatePicker, Page, Radio, RadioGroup, Select, TextField, useDatepicker, VStack} from "@navikt/ds-react";
import {useState} from "react";

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

    function erKlarForNeste(): boolean {
        return skjema.reistTilbake === false || (
            skjema.reistTilbake === true &&
            skjema.avreiseFraDato !== undefined &&
            skjema.avreiseTilDato !== undefined &&
            skjema.reisteFraBegrunnelse !== undefined
        );
    }

    return (
        <Page className="brukerdialog">
            <VStack gap="10">

                <Select
                    label="Hvilket land bor du i?"
                    description="Med bostedsland mener vi ditt vanlige oppholdssted, som er der du eier eller leier bolig og tilbringer mesteparten av tiden din. Du må som hovedregel oppholde deg i Norge for å ha rett til dagpenger fra Norge."
                    value={skjema.bostedsland}
                    onChange={(value) => {setSkjema({...skjema, bostedsland: value.target.value})} }
                >
                    <option value="">- Velg land -</option>
                    <option value="norge">Norge</option>
                    <option value="sverige">Sverige</option>
                    <option value="danmark">Danmark</option>
                </Select>

                {(!!skjema.bostedsland && skjema.bostedsland !== "norge") && (
                    <VStack>
                        <RadioGroup
                            legend="Har du reist tilbake til bostedslandet ditt etter at du ble arbeidsledig eller permittert?"
                            value={skjema.reistTilbake}
                            onChange={(value: boolean) => {setSkjema({...skjema, reistTilbake: value})} }
                        >
                            <Radio value={true}>Ja</Radio>
                            <Radio value={false}>Nei</Radio>
                        </RadioGroup>

                        {
                            skjema.reistTilbake === true && (
                                <VStack>
                                    <div className="min-h-96">
                                        <DatePicker {...fraDato.datepickerProps}>
                                            <DatePicker.Input {...fraDato.inputProps} label="Velg dato" />
                                        </DatePicker>
                                    </div>
                                    <div className="min-h-96">
                                        <DatePicker {...tilDato.datepickerProps}>
                                            <DatePicker.Input {...tilDato.inputProps} label="Velg dato" />
                                        </DatePicker>
                                    </div>
                                    <TextField label={"Hvorfor reiste du fra Norge"}
                                               value={skjema.reisteFraBegrunnelse}
                                               onChange={(textbox) => setSkjema({...skjema, reisteFraBegrunnelse: textbox.target.value})}/>

                                </VStack>
                            )
                        }

                        {erKlarForNeste() && <RadioGroup
                            legend="Reiste du hjem til landet du bor i en gang i uken eller mer, mens du jobbet i Norge?"
                            value={skjema.reistHjemMinstEnGangIUken}
                            onChange={(value: boolean) => {setSkjema({...skjema, reistHjemMinstEnGangIUken: value})} }
                        >
                            <Radio value={true}>Ja</Radio>
                            <Radio value={false}>Nei</Radio>
                        </RadioGroup> }

                        {skjema.reistHjemMinstEnGangIUken === false && (
                            <RadioGroup
                                legend="Reiste du i takt med rotasjon?"
                                value={skjema.reistHjemRotasjon}
                                onChange={(value: boolean) => {setSkjema({...skjema, reistHjemRotasjon: value})} }
                            >
                                <Radio value={true}>Ja</Radio>
                                <Radio value={false}>Nei</Radio>
                            </RadioGroup>
                        )}

                    </VStack>
                )}
            </VStack>
        </Page>
    );
}