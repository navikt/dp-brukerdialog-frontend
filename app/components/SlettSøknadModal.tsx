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
  const { t } = useTranslation("common");
  const [laster, setLaster] = useState(false);

  async function slettSøknad() {
    try {
      const response = await fetch(`${getEnv("BASE_PATH")}/api/slett/${søknadId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(t("slettSøknad.feil"));
      }
      sletteSøknadSpørsmålModal.current?.close();
      slettetSøknadBekreftelseModal.current?.showModal();
    } catch (error) {
      console.error(t("slettSøknad.feil"), error);
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
        {t("slettSøknad.apneKnapp")}
      </Button>
      <Modal
        ref={sletteSøknadSpørsmålModal}
        header={{ heading: t("slettSøknad.bekreftelseTittel") }}
      >
        <Modal.Body>
          <VStack gap="space-24">
            <BodyLong>{t("slettSøknad.bekreftelseBeskrivelse")}</BodyLong>
            <HStack gap="space-32">
              <Button variant="danger" type="button" onClick={() => slettSøknad()}>
                {t("slettSøknad.slettKnapp")}
              </Button>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => sletteSøknadSpørsmålModal.current?.close()}
              >
                {t("slettSøknad.avbrytKnapp")}
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal>
      <Modal
        ref={slettetSøknadBekreftelseModal}
        header={{ heading: t("slettSøknad.slettetTittel") }}
      >
        <Modal.Body>
          <VStack gap="space-24">
            <BodyLong>{t("slettSøknad.slettetBeskrivelse")}</BodyLong>
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
                {t("slettSøknad.lukkKnapp")}
              </Button>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => {
                  slettetSøknadBekreftelseModal.current?.close();
                  return navigate("/arbeidssoker");
                }}
              >
                {t("slettSøknad.startNySøknadKnapp")}
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal>
    </Box>
  );
}
