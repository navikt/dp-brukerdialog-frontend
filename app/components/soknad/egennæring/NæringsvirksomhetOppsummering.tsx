import {INæringsvirksomhet} from "~/models/egennaring.types";
import {Box, Button, VStack} from "@navikt/ds-react";
import {PencilIcon, TrashIcon} from "@navikt/aksel-icons";


interface NæringsvirksomhetOppsummeringProps {
    virksomhet: INæringsvirksomhet
}

export default function NæringsvirksomhetOppsummering({virksomhet}: NæringsvirksomhetOppsummeringProps) {
    return (
        <VStack>
            <Box
                background="surface-alt-3-subtle"
                padding="4"
                shadow="medium"
                borderRadius="xlarge" >
                <p>ORGANISASJONSNUMMER FOR NÆRINGSVIRKSOMHET</p>
                <h1>{virksomhet.organisasjonummer}</h1>
                <div>
                    <Button icon={<PencilIcon/>} variant="secondary" size="small">Endre svar</Button>
                    <Button icon={<TrashIcon/>} variant="tertiary" size="small">Slett</Button>
                </div>
            </Box>
        </VStack>
    )
}