import JaNeiFaktum from "~/components/spørsmål/jaNeiFaktum";
import { Alert, Button, Checkbox, CheckboxGroup, Modal, TextField, VStack } from "@navikt/ds-react";
import { useRef, useState } from "react";
import { IEgenNæring, IGårdsbruk } from "~/models/egennaring.types";

interface GardsbrukProps {
  skjema: IEgenNæring;
  setSkjema: (schema: IEgenNæring) => void;
}

export default function Gardsbruk({ skjema, setSkjema }: GardsbrukProps) {
  const egenGårdsbrukvirksomhetRef = useRef<HTMLDialogElement>(null);

  const [gårdsbruk, setGårdsbruk] = useState<IGårdsbruk>({
    organisasjonummer: undefined,
    typeGårdsbruk: [],
    eierAvGårdsbruk: undefined,
    prosentAvInntektTilDeg: undefined,
    arbeidstimerILøpetAvÅret: undefined,
    arbeidsTimer: undefined,
    forklaringPåBeregning: undefined,
  });

  function leggTilGårdsbruk() {
    console.log("Legger til gårdsbruk:", gårdsbruk);
    const egneGårdsbruk = skjema.egneGårdsbruk;
    egneGårdsbruk.push({
      organisasjonummer: gårdsbruk.organisasjonummer,
      typeGårdsbruk: gårdsbruk.typeGårdsbruk,
      eierAvGårdsbruk: gårdsbruk.eierAvGårdsbruk,
      prosentAvInntektTilDeg: gårdsbruk.prosentAvInntektTilDeg,
      arbeidstimerILøpetAvÅret: gårdsbruk.arbeidstimerILøpetAvÅret,
      arbeidsTimer: gårdsbruk.arbeidsTimer,
      forklaringPåBeregning: gårdsbruk.forklaringPåBeregning,
    });

    setSkjema({ ...skjema, egneGårdsbruk: egneGårdsbruk });
    setGårdsbruk({
      organisasjonummer: "",
      typeGårdsbruk: [],
      eierAvGårdsbruk: [],
      prosentAvInntektTilDeg: "",
      arbeidstimerILøpetAvÅret: "",
      arbeidsTimer: "",
      forklaringPåBeregning: "",
    });
  }

  return (
    <VStack gap="5">
      <JaNeiFaktum
        ledetekst={"Driver du eget gårdsbruk?"}
        vedEndring={(value) => {
          setSkjema({ ...skjema, driverEgetGårdsbruk: value });
        }}
        aktiv={true}
      />

      {skjema.driverEgetGårdsbruk === true && (
        <>
          <Alert contentMaxWidth={false} variant="info">
            <VStack gap="5">
              <div>
                Selv om du driver et eget gårdsbruk må du være villig til å ta annet arbeid.
              </div>
              <div>
                Hvis du jobber mer enn 50 prosent av tidligere arbeidstid har du ikke rett til
                dagpenger.
              </div>
              <div>
                Når du driver gårdsbruk tar NAV utgangspunkt i størrelsen på bruket, arbeidsomfang,
                mekaniseringsgrad og beliggenhet.
              </div>
            </VStack>
          </Alert>
          {skjema.egneGårdsbruk.map((value) => (
            <div key={value.organisasjonummer}>{value.organisasjonummer}</div>
          ))}
          <Button
            variant={"secondary"}
            onClick={() => egenGårdsbrukvirksomhetRef.current?.showModal()}
          >
            + Legg til gårdsbruk
          </Button>
          <Modal
            ref={egenGårdsbrukvirksomhetRef}
            header={{ heading: "Legg til gårdsbruk" }}
            width={600}
          >
            <Modal.Body>
              <form
                method="dialog"
                id="egetGårdbruk"
                onSubmit={() => {
                  leggTilGårdsbruk();
                }}
              >
                <TextField
                  name="organisasjonsnummer"
                  value={gårdsbruk.organisasjonummer}
                  label="Gårdbrukets organisasjonsnummer"
                  onChange={(value) => {
                    setGårdsbruk({
                      ...gårdsbruk,
                      organisasjonummer: value.target.value,
                    });
                  }}
                />

                <CheckboxGroup
                  legend="Hvilken type gårdsbruk driver du?"
                  onChange={(val: string[]) =>
                    setGårdsbruk({
                      ...gårdsbruk,
                      typeGårdsbruk: val,
                    })
                  }
                >
                  <Checkbox value="dyr">Dyr</Checkbox>
                  <Checkbox value="jord">Jord</Checkbox>
                  <Checkbox value="skog">Skog</Checkbox>
                  <Checkbox value="annet">Annet</Checkbox>
                </CheckboxGroup>

                <CheckboxGroup
                  legend="Hvem eier gårdsbruket? Du kan krysse for flere"
                  onChange={(val: string[]) =>
                    setGårdsbruk({
                      ...gårdsbruk,
                      eierAvGårdsbruk: val,
                    })
                  }
                >
                  <Checkbox value="dyr">Dyr</Checkbox>
                  <Checkbox value="jord">Jord</Checkbox>
                  <Checkbox value="skog">Skog</Checkbox>
                  <Checkbox value="annet">Annet</Checkbox>
                </CheckboxGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button form="egetGårdbruk">Lagre og lukk</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </VStack>
  );
}
