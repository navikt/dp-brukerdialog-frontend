import {Page, VStack} from "@navikt/ds-react";
import {useState} from "react";
import {IEgenNæring,} from "~/models/egennaring.types";
import Gardsbruk from "~/components/soknad/egennæring/Gardsbruk";
import Næringsvirksomhet from "~/components/soknad/egennæring/Næringsvirksomhet";


export default function EgenNæring() {

    const [skjema, setSkjema] = useState<IEgenNæring>({
        driverEgenNæringsvirksomhet: undefined,
        driverEgetGårdsbruk: undefined,
        egneNæringsvirksomheter: [],
        egneGårdsbruk: []
    });

    return (
        <main id="maincontent" tabIndex={-1}>
            <Page className="brukerdialog">
                <VStack gap="10">
                    <Næringsvirksomhet skjema={skjema} setSkjema={setSkjema}/>
                    <Gardsbruk skjema={skjema} setSkjema={setSkjema}/>
                </VStack>
            </Page>
        </main>
    );
}