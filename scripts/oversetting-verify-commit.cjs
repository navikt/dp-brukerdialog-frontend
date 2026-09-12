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
  const mainBranch = oppdaterMainBranch();

  if (!mainBranch) {
    return;
  }

  const branch = await input({
    message: "Hvilken oversetting branch skal verifiseres?",
    default: mainBranch,
    validate: (value) => value.startsWith("oversetting-") || "Branchen må starte med oversetting-",
  });

  hentOgByttTilBranch(mainBranch, branch);

  const coAuthor = await rawlist({
    message: "Hvem skal være co-author?",
    choices: CO_AUTHORS.map(({ name, email }) => ({
      name: `${name} <${email}>`,
      value: { name, email },
    })),
  });

  visKommandoerSomSkalKjøres(branch, coAuthor);

  const fortsett = await confirm({
    message: "Ønsker du å fortsette?",
    default: false,
  });

  if (!fortsett) {
    return;
  }

  verifiserOversettingBranch(branch, coAuthor);
}

function oppdaterMainBranch() {
  const currentBranch = git(["branch", "--show-current"]);

  if (currentBranch !== "main") {
    console.warn("Scriptet kan bare kjøres fra main-branchen.");
    return;
  }

  if (git(["status", "--porcelain"])) {
    console.warn("Du har ulagrede endringer");
    console.warn("Kjør git stash før og start scriptet på nytt.");
    return;
  }

  console.info("Puller siste endringer fra origin/main med rebase");
  git(["pull", "--rebase"]);

  return currentBranch;
}

function hentOgByttTilBranch(currentBranch, branch) {
  console.info(`Henter siste endringer fra origin/main og origin/${branch}`);
  git(["fetch", "origin", "main", branch]);

  if (currentBranch !== branch) {
    try {
      git(["switch", branch]);
    } catch {
      git(["switch", "--create", "--track", branch, `origin/${branch}`]);
    }
  }
}

function visKommandoerSomSkalKjøres(branch, coAuthor) {
  console.info("Følgende kommandoer vil bli kjørt:");
  console.info(`
    git pull --rebase origin ${branch}
    git rebase main
    git reset --soft main
    git add .
    git commit -m "Verified oversetting" -m "Co-authored-by: ${coAuthor.name} <${coAuthor.email}>"
    git push --force-with-lease origin ${branch}
    `);
}

function verifiserOversettingBranch(branch, coAuthor) {
  console.info("Starter verifisering av oversetting...");
  git(["pull", "--rebase", "origin", branch]);
  git(["rebase", "main"]);
  git(["reset", "--soft", "main"]);
  git(["add", "."]);
  git([
    "commit",
    "-m",
    "Verified oversetting",
    "-m",
    `Co-authored-by: ${coAuthor.name} <${coAuthor.email}>`,
  ]);
  git(["push", "--force-with-lease", "origin", branch]);

  console.info("Verifisering av oversetting fullført ✅");
}

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["inherit", "pipe", "inherit"],
  }).trim();
}
