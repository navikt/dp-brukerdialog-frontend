# Instruksjoner for kodegjennomgang

Les `AGENTS.md` for prosjektmønstre og testkommandoer. Rapporter konkrete feil med fil og linje, og skill mellom feil innført av PR-en og eksisterende forhold.

## Søknadsflyt

- Ved endringer i en seksjon: Sjekk at spørsmål, synlighet, skjema og oppsummering stemmer overens, og at versjonerte seksjoner fortsatt kan åpnes.
- Kontroller at validering og navigasjon håndterer tilbake, fortsett senere og innsending som tiltenkt. Etterspør målrettede tester når oppførselen endres.
- Ved endringer i ruter eller serverkall: Sjekk at søknads-ID og andre parametere ikke kan brukes til å omgå tilgang til en annen brukers data, og at auth/OBO-kall fortsatt skjer på serveren.

## Grensesnitt og tekst

- Sjekk at nye brukerrettede tekster bruker eksisterende i18next-nøkler og har riktige oppføringer for `nb`, `nn` og `en` i samme namespace og seksjonsversjon. Bevar nøkkelstrukturen.
- Sjekk at endret UI bruker Aksel og fungerer med tastatur, skjermleser og feilmeldinger.

## Omfang og sikkerhet

- Påpek hemmeligheter eller personopplysninger i kode, klientdata eller vanlige logger. Ikke gjengi slike verdier i review-kommentarer.
- Påpek endringer utenfor PR-ens formål, som omdøping og ombygging av fungerende kode.
- Kontroller at relevante Vitest-tester, og Playwright-tester for berørte brukerflyter, er oppdatert ved endret oppførsel.
