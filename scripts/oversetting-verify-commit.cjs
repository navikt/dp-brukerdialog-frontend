const { confirm, input, rawlist } = require("@inquirer/prompts");
const { execFileSync } = require("node:child_process");

const CO_AUTHORS = [
  { name: "John Martin Lindseth", email: "john.martin.lindseth@nav.no" },
  { name: "Arselan Sultani", email: "arselan.sultani@nav.no" },
  { name: "Elisabeth Kongshavn", email: "elisabeth.kongshavn@nav.no" },
  { name: "Tina Solicki", email: "tina.solicki@nav.no" },
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

  const coAuthor = await rawlist({
    message: "Hvem skal være co-author?",
    choices: CO_AUTHORS.map(({ name, email }) => ({
      name: `${name} <${email}>`,
      value: { name, email },
    })),
  });

  console.info("Følgende kommandoer vil bli kjørt:");
  console.info(`
    git switch ${branch}
    git reset --soft origin/main
    git add .
    git commit -m "Verified oversetting" -m "Co-authored-by: ${coAuthor.name} <${coAuthor.email}>"
    git push --force-with-lease origin ${branch}
    `);

  const shouldContinue = await confirm({
    message: "Ønsker du å fortsette?",
    default: false,
  });

  if (!shouldContinue) {
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
}

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["inherit", "pipe", "inherit"],
  }).trim();
}
