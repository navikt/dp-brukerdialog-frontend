import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  Gårdsbruk,
  hvemEierGårdsbruket,
  hvilkeTypeGårdsbrukDriverDu,
  hvordanHarDuBeregnetAntallArbeidstimerTotalt,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
  hvorMangeProsentAvInntektenGårTilDeg,
  leggTilGårdsbrukSpørsmål,
  LeggTilGårdsbrukSvar,
  organisasjonsnummer,
} from "~/seksjon-regelsett/egen-næring/egen-næring.spørsmål";
import { leggTilGårdsbrukSchema } from "~/seksjon-regelsett/egen-næring/egen-næring.schema";

interface IProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  gårdsbruk: Gårdsbruk[];
  setGårdsbruk: (gårdsbruk: Gårdsbruk[]) => void;
}

export function LeggTilGårdsbrukModal({ modalRef, setGårdsbruk, gårdsbruk }: IProps) {
  const form = useForm({
    submitSource: "state",
    schema: leggTilGårdsbrukSchema,
    defaultValues: {},
    handleSubmit: (data) => {
      const nyttGårdsbruk: Gårdsbruk = {
        organisasjonsnummer: data[organisasjonsnummer]!,
        [hvilkeTypeGårdsbrukDriverDu]: data[hvilkeTypeGårdsbrukDriverDu]!,
        [hvemEierGårdsbruket]: data[hvemEierGårdsbruket]!,
        [hvorMangeProsentAvInntektenGårTilDeg]: data[hvorMangeProsentAvInntektenGårTilDeg]!,
        [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]:
          data[hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]!,
        [hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]:
          data[hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]!,
        [hvordanHarDuBeregnetAntallArbeidstimerTotalt]:
          data[hvordanHarDuBeregnetAntallArbeidstimerTotalt]!,
      };

      setGårdsbruk([...gårdsbruk, nyttGårdsbruk]);
      modalRef.current?.close();
    },
    resetAfterSubmit: true,
  });

  return (
    <Modal ref={modalRef} width={700} aria-labelledby="modal-heading">
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">Legg til gårdsbruk</HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {leggTilGårdsbrukSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof LeggTilGårdsbrukSvar)}
                />
              );
            })}

            <HStack className="mt-4" justify="end">
              <Button
                type="submit"
                icon={<FloppydiskIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
              >
                Lagre og lukk
              </Button>
            </HStack>
          </VStack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}