import { Button } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { erVisNøklerAktivert, NØKKEL_MARKØR_REGEX, settVisNøkler } from "../utils/vis-nokler.utils";

function merkTekstnoderMedNøkkel(rot: Node) {
  const walker = document.createTreeWalker(rot, NodeFilter.SHOW_TEXT);
  const treffNoder: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.textContent && NØKKEL_MARKØR_REGEX.test(node.textContent)) {
      treffNoder.push(node as Text);
    }
  }

  treffNoder.forEach((tekstNode) => {
    const tekst = tekstNode.textContent ?? "";
    const match = tekst.match(NØKKEL_MARKØR_REGEX);
    if (!match || match.index === undefined) return;

    const [fullTreff, nøkkel] = match;
    const parent = tekstNode.parentNode;
    if (!parent) return;

    // Fjerner kun markøren fra selve tekstnoden (samme node-referanse) siden React
    // eier denne noden - å erstatte/fjerne den forårsaker "not a child" feil ved re-render.
    tekstNode.data = tekst.slice(0, match.index) + tekst.slice(match.index + fullTreff.length);

    const merke = document.createElement("span");
    merke.className = "vis-nokkel-merke";
    merke.textContent = "T";
    merke.dataset.tooltip = nøkkel;
    merke.addEventListener("click", () => {
      void navigator.clipboard.writeText(nøkkel);
      merke.dataset.tooltip = "Kopiert!";
      window.setTimeout(() => {
        merke.dataset.tooltip = nøkkel;
      }, 1000);
    });

    // Settes inn som en ny søsken-node etter tekstnoden - rører ikke noder React eier.
    parent.insertBefore(merke, tekstNode.nextSibling);
  });
}

function fjernNøkkelmerker() {
  document.querySelectorAll(".vis-nokkel-merke").forEach((merke) => merke.remove());
}

export function VisNøklerKnapp() {
  const [aktiv, setAktiv] = useState(false);

  useEffect(() => {
    setAktiv(erVisNøklerAktivert());
  }, []);

  useEffect(() => {
    if (!aktiv) {
      fjernNøkkelmerker();
      return;
    }

    const finnOgMerkMaincontent = () => {
      const maincontent = document.getElementById("maincontent");
      if (maincontent) merkTekstnoderMedNøkkel(maincontent);
    };

    finnOgMerkMaincontent();

    const observer = new MutationObserver(finnOgMerkMaincontent);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, [aktiv]);

  return (
    <div className="vis-nokler-knapp">
      <Button
        size="small"
        variant={aktiv ? "danger" : "secondary"}
        onClick={() => {
          const nyVerdi = !aktiv;
          setAktiv(nyVerdi);
          settVisNøkler(nyVerdi);
        }}
      >
        {aktiv ? "Skjul oversettelsesnøkler" : "Vis oversettelsesnøkler"}
      </Button>
    </div>
  );
}
