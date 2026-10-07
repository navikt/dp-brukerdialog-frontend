const { rawlist, input } = require("@inquirer/prompts");
const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("child_process");

const envPath = path.resolve(__dirname, "..", ".env");
let envText = fs.readFileSync(envPath, "utf-8");

const TOKENX_OBO_URL = "https://tokenx-token-generator.intern.dev.nav.no/api/public/obo";
const TOKENX_IDPORTEN_OBO_URL = "https://tokenx-token-generator.intern.dev.nav.no/api/obo";

const ISSUER = {
  tokenX: "tokenX",
  tokenXIdPorten: "tokenXIdPorten",
};

const TOKEN_LIST = [
  {
    env: "DP_INNSYN_TOKEN",
    aud: "dev-gcp:teamdagpenger:dp-innsyn",
    issuer: ISSUER.tokenX,
  },
  {
    env: "PAW_ARBEIDSSOEKERREGISTERET_TOKEN",
    aud: "dev-gcp:paw:paw-arbeidssoekerregisteret-api-oppslag-v2",
    issuer: ISSUER.tokenX,
  },
  {
    env: "OKONOMI_KONTOREGISTER_TOKEN",
    aud: "dev-gcp:okonomi:sokos-kontoregister-person",
    issuer: ISSUER.tokenX,
  },
  {
    env: "SAF_TOKEN",
    aud: "dev-fss:teamdokumenthandtering:safselvbetjening-q1",
    issuer: ISSUER.tokenX,
  },
  {
    env: "DP_SOKNAD_ORKESTRATOR_TOKEN",
    aud: "dev-gcp:teamdagpenger:dp-soknad-orkestrator",
    issuer: ISSUER.tokenXIdPorten,
  },
];

const IDENT_LIST = [
  { name: "Top Sure: 21857998666", value: "21857998666" },
  { name: "Hes Påske: 17477146473", value: "17477146473" },
  { name: "Komplett Sol: 07447534341", value: "07447534341" },
  { name: "Dynamisk Røyskatt: 07430195322", value: "07430195322" },
  { name: "Veik Bly: 19897299162", value: "19897299162" },
  { name: "Sofitikert Onkel: 06447149530", value: "06447149530" },
  { name: "Hensiktsmessig Bris: 29518100112", value: "29518100112" },
];

init();

async function init() {
  try {
    const ident = await rawlist({
      message: "👤 Velg ident:",
      choices: IDENT_LIST,
    });

    for (const { env, aud, issuer } of TOKEN_LIST) {
      const token =
        issuer === ISSUER.tokenXIdPorten
          ? await getIdPortenToken(env, aud)
          : await getToken(ident, aud);

      if (!token) {
        throw new Error(`Token ble ikke funnet for ${env}`);
      }

      setEnvValue(env, token);
    }
  } catch (err) {
    console.error("❌ Feil:", err.message);
  }
}

async function getToken(ident, aud) {
  const formData = new FormData();

  formData.append("pid", ident);
  formData.append("aud", aud);

  try {
    const response = await fetch(TOKENX_OBO_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  } catch (err) {
    console.error("❌ Feil ved henting av token fra TokenX:", err.message);
    return null;
  }
}

async function getIdPortenToken(env, aud) {
  const url = `${TOKENX_IDPORTEN_OBO_URL}?aud=${aud}`;

  console.info(`\n🔐 ${env} krever ekte ID-porten (idp: https://test.idporten.no).`);
  console.info("   Logg inn med en ID-porten testbruker i nettleseren som åpnes.");
  console.info(`   Hvis den ikke åpner automatisk, gå til:\n   ${url}\n`);

  openBrowser(url);

  const answer = await input({
    message: "📋 Lim inn access_token (eller hele JSON-svaret):",
  });

  return parseAccessToken(answer);
}

function parseAccessToken(answer) {
  const value = answer.trim();

  try {
    const parsed = JSON.parse(value);
    return parsed.access_token || null;
  } catch {
    return value || null;
  }
}

function openBrowser(url) {
  const cmd =
    process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";

  try {
    execSync(`${cmd} "${url}"`);
  } catch {
    // Ignorer – bruker kan åpne URL manuelt.
  }
}

function setEnvValue(key, value) {
  const regex = new RegExp(`^${key}=.*$`, "m");
  if (envText.match(regex)) {
    envText = envText.replace(regex, `${key}=${value}`);
  } else {
    envText += `\n${key}=${value}`;
  }

  fs.writeFileSync(envPath, envText, "utf-8");

  console.info(`✅ ${key}`);
}
