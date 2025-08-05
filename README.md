# dp-brukerdialog-frontend

Brukerdialog er et frontend-applikasjon for dagpengersøknad.

## Kom i gang

1. Kjør `npm install` for å installere avhengigheter.
2. Kjør `npm run copy-env` for å kopiere `.env.example` til `.env`.

## Starte dev server:

For å starte utviklingsserveren, kjør `npm run dev`

## Kjøre localhost med dev-backend

1. På `.env`, sett `USE_MSW` til false
2. Kjør `npm run token` for å generere en token
3. Kjør `npm run dev` for å starte appen

## IntelliJ Prettier and Eslint configuration

1. Set Prettier as the default formatter:
   1. Preferences > Settings > Languages & Frameworks > JavaScript / TypeScript > Prettier
   2. Select Automatic ESLint Configuration
   3. Select Run on save
2. Enable “On Save” Formatting:
   1. Go to: Preferences / Settings > Tools > Actions on Save
   2. Enable: Run Prettier, Reformat code and Optimize imports
3. In Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint
   1. Select Automatic ESLint Configuration
   2. Select Run eslint --fix on save
