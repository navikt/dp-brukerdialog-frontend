import { TrashIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, Button, HStack, Modal, VStack } from "@navikt/ds-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { getEnv } from "~/utils/env.utils";

interface IProps {
  søknadId?: string;
}

export function SlettSøknadModal({ søknadId }: IProps) {
  const sletteSøknadSpørsmålModal = useRef<HTMLDialogElement>(null);
  const slettetSøknadBekreftelseModal = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation("felles");
  const [laster, setLaster] = useState(false);

  async function slettSøknad() {
    try {
      const response = await fetch(`${getEnv("BASE_PATH")}/api/slett/${søknadId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(t("slettSøknadModal.feil"));
      }
      sletteSøknadSpørsmålModal.current?.close();
      slettetSøknadBekreftelseModal.current?.showModal();
    } catch (error) {
      console.error(t("slettSøknadModal.feil"), error);
    }
  }

  return (
    <Box>
      <Button
        variant="tertiary"
        size="small"
        icon={<TrashIcon aria-hidden />}
        onClick={() => {
          sletteSøknadSpørsmålModal.current?.showModal();
        }}
      >
        {t("footer.slettSøknadKnapp")}
      </Button>
      <Modal
        ref={sletteSøknadSpørsmålModal}
        header={{ heading: t("slettSøknadModal.bekreftelseTittel") }}
      >
        <Modal.Body>
          <VStack gap="space-24">
            <BodyLong>{t("slettSøknadModal.bekreftelseBeskrivelse")}</BodyLong>
            <HStack gap="space-32">
              <Button variant="danger" type="button" onClick={() => slettSøknad()}>
                {t("slettSøknadModal.slettKnapp")}
              </Button>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => sletteSøknadSpørsmålModal.current?.close()}
              >
                {t("slettSøknadModal.avbrytKnapp")}
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal>
      <Modal
        ref={slettetSøknadBekreftelseModal}
        header={{ heading: t("slettSøknadModal.slettetTittel") }}
      >
        <Modal.Body>
          <VStack gap="space-24">
            <BodyLong>{t("slettSøknadModal.slettetBeskrivelse")}</BodyLong>
            <HStack gap="space-32">
              <Button
                variant="primary"
                as="a"
                loading={laster}
                onClick={() => {
                  setLaster(true);
                  window.location.href = `${getEnv("DP_MINE_DAGPENGER_URL")}`;
                }}
              >
                {t("slettSøknadModal.lukkKnapp")}
              </Button>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => {
                  slettetSøknadBekreftelseModal.current?.close();
                  return navigate("/arbeidssoker");
                }}
              >
                {t("slettSøknadModal.startNySøknadKnapp")}
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal>
    </Box>
  );
}
