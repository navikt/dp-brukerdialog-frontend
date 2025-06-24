import {Page, VStack} from "@navikt/ds-react";
import {useState} from "react";
import JaNeiFaktum from "~/components/faktum/jaNeiFaktum";

interface EgentNæring {

}

export default function EgentNæring() {
    const [skjema, setSkjema] = useState<EgentNæring>({
        
    });

    return (
        <Page className="brukerdialog">
            <VStack gap="10">

                <JaNeiFaktum
                    ledetekst={"Driver du egen næringsvirksomhet?"}
                    aktiv={true}
                />

            </VStack>
        </Page>
    );
}