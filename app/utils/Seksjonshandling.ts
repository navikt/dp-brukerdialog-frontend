import { z } from "zod";

export enum Seksjonshandling {
  tilbakenavigering = "tilbakenavigering",
  fortsettSenere = "fortsettSenere",
  neste = "neste",
}

export const seksjonshandlingSchema = z.enum([
  Seksjonshandling.tilbakenavigering,
  Seksjonshandling.fortsettSenere,
  Seksjonshandling.neste,
]);
