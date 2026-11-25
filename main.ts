import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const scriptDirectory = fileURLToPath(new URL(".", import.meta.url));
const outputDirectory = "/output";
const outputPath = `${outputDirectory}/entry.txt`;
const text = "Falling asleep in the backseat of the car on a long drive home and pretending to stay asleep just so my dad would carry me inside.";

const characterCount = Array.from(text).length;
if (!scriptDirectory || characterCount < 1 || characterCount > 280 || /[\r\n]/.test(text)) {
  throw new Error("Entry does not satisfy the required format");
}

mkdirSync(outputDirectory, { recursive: true });
const expected = Buffer.from(`${text}\n`, "utf8");
writeFileSync(outputPath, expected);
if (!readFileSync(outputPath).equals(expected)) {
  throw new Error("Written entry does not match the expected text");
}
