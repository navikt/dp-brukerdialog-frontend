import {Radio, RadioGroup} from "@navikt/ds-react";

interface JaNeiFaktumProps {
    ledetekst: string;
    beskrivelse?: string;
    verdi?: boolean;
    vedEndring?: (value: boolean) => void;
    aktiv: boolean;
}

export default function JaNeiFaktum(props: JaNeiFaktumProps) {
    return props.aktiv && <RadioGroup
        legend={props.ledetekst}
        description={props.beskrivelse}
        value={props.verdi}
        onChange={props.vedEndring}
    >
        <Radio value={true}>Ja</Radio>
        <Radio value={false}>Nei</Radio>
    </RadioGroup>;
}