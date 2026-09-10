const { confirm, input, rawlist } = require("@inquirer/prompts");
const { execFileSync } = require("node:child_process");

const CO_AUTHORS = [
  { name: "John Martin Lindseth", email: "john.martin.lindseth@nav.no" },
  { name: "Arselan Sultani", email: "arselan.sultani@nav.no" },
  { name: "Elisabeth Kongshavn", email: "elisabeth.kongshavn@nav.no" },
  { name: "Tina Solicki", email: "tina.solicki@nav.no" },
  { name: "Henriette Levang Kårfald", email: "henriette.levang.karfald@nav.no" },
  { name: "Henriette Hjorthen Støren", email: "henriette.hjorthen.storen@nav.no" },
];

main().catch((error) => {
  if (error.name === "ExitPromptError") {
    console.info("Avbrutt.");
    process.exit(0);
  }

  console.error("Feil:", error.message);
  process.exit(1);
});

async function main() {
  const currentBranch = git(["branch", "--show-current"]);

  const branch = await input({
    message: "Hvilken oversetting branch skal verifiseres?",
    default: currentBranch,
    validate: (value) => value.startsWith("oversetting-") || "Branchen må starte med oversetting-",
  });

  git(["fetch", "origin", "main", branch]);

  if (currentBranch !== branch) {
    try {
      git(["switch", branch]);
    } catch {
      git(["switch", "--create", "--track", branch, `origin/${branch}`]);
    }
  }

  const localHead = git(["rev-parse", "HEAD"]);
  const remoteHead = git(["rev-parse", `origin/${branch}`]);
  if (localHead !== remoteHead) {
    const shouldSync = await confirm({
      message: `Lokal ${branch} (${localHead.slice(0, 7)}) er ikke i sync med origin/${branch} (${remoteHead.slice(0, 7)}). Vil du hard-resette lokal branch til origin/${branch} før du fortsetter? (Nei = avbryt)`,
      default: true,
    });

    if (!shouldSync) {
      console.info("Avbrutt for å unngå å committe feil innhold.");
      return;
    }

    git(["reset", "--hard", `origin/${branch}`]);
  }

  const uncommitted = git(["status", "--porcelain"]);
  if (uncommitted) {
    console.warn("⚠️  Du har uncommittede lokale endringer som vil bli inkludert i commiten:");
    console.warn(uncommitted);
    const shouldContinueWithLocalChanges = await confirm({
      message: "Fortsette med disse lokale endringene inkludert?",
      default: false,
    });
    if (!shouldContinueWithLocalChanges) {
      console.info("Avbrutt. Stash eller committ endringene separat først.");
      return;
    }
  }

  const coAuthor = await rawlist({
    message: "Hvem skal være co-author?",
    choices: CO_AUTHORS.map(({ name, email }) => ({
      name: `${name} <${email}>`,
      value: { name, email },
    })),
  });

  const backupTag = `backup/${branch}-${Date.now()}`;
  git(["tag", backupTag, "HEAD"]);

  const filesChanged = git(["diff", "--name-only", "origin/main", "HEAD"])
    .split("\n")
    .filter(Boolean);

  console.info(`Filer som vil inngå i "Verified oversetting"-commiten:`);
  console.info(filesChanged.map((file) => `  ${file}`).join("\n"));

  const unexpectedFiles = filesChanged.filter(
    (file) => !file.startsWith("app/i18n/locales/") && !file.includes("locales/"),
  );
  if (unexpectedFiles.length > 0) {
    console.warn(
      "⚠️  Følgende filer ser ikke ut som oversettingsfiler og vil likevel bli inkludert:",
    );
    console.warn(unexpectedFiles.map((file) => `  ${file}`).join("\n"));
  }

  console.info("Følgende kommandoer vil bli kjørt:");
  console.info(`
    git switch ${branch}
    git reset --soft origin/main
    git add .
    git commit -m "Verified oversetting" -m "Co-authored-by: ${coAuthor.name} <${coAuthor.email}>"
    git push --force-with-lease origin ${branch}

    (sikkerhetskopi lagret som tag: ${backupTag})
    `);

  const shouldContinue = await confirm({
    message: "Ønsker du å fortsette?",
    default: false,
  });

  if (!shouldContinue) {
    git(["tag", "-d", backupTag]);
    return;
  }

  git(["reset", "--soft", "origin/main"]);
  git(["add", "."]);
  git([
    "commit",
    "-m",
    "Verified oversetting",
    "-m",
    `Co-authored-by: ${coAuthor.name} <${coAuthor.email}>`,
  ]);
  git(["push", "--force-with-lease", "origin", branch]);
  console.info(
    `Ferdig. Om noe ble feil kan du gjenopprette med: git reset --hard ${backupTag}`,
  );
}

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["inherit", "pipe", "inherit"],
  }).trim();
}
