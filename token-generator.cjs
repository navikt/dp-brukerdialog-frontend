const { rawlist } = require("@inquirer/prompts");
const fs = require("fs");
const path = require("path");

let envPath = path.resolve(__dirname, ".env");
let envText = fs.readFileSync(envPath, "utf-8");

const tokenXUrl = "https://tokenx-token-generator.intern.dev.nav.no/api/public/obo";

const envConfig = {
  env: "DP_SOKNAD_ORKESTRATOR_TOKEN",
  aud: "dev-gcp:teamdagpenger:dp-soknad-orkestrator",
};

const identList = [
  { name: "Top Sure: 21857998666", value: "21857998666" },
  { name: "Hes Påske: 17477146473", value: "17477146473" },
  { name: "Komplett Sol: 07447534341", value: "07447534341" },
];

init();

async function init() {
  try {
    const ident = await getIdent();
    const token = await getToken(ident);

    setEnvValue(envConfig.env, token);

    if (!token) {
      throw new Error("Token ble ikke funnet i responsen");
    }
  } catch (err) {
    console.error("❌ Feil:", err.message);
  }
}

async function getToken(ident) {
  const formData = new FormData();

  formData.append("pid", ident);
  formData.append("aud", envConfig.aud);

  try {
    const response = await fetch(tokenXUrl, {
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

async function getIdent() {
  return await rawlist({
    message: "Velg ident:",
    choices: identList,
  });
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
