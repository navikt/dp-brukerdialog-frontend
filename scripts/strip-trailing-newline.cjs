const fs = require("fs");

const files = process.argv.slice(2);

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const stripped = content.replace(/\r?\n+$/, "");

  if (stripped !== content) {
    fs.writeFileSync(file, stripped);
  }
}
