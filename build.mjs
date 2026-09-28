import { mkdir, readFile, writeFile } from "node:fs/promises";

const assetNames = ["index.html", "styles.css", "app.js"];
const assets = Object.fromEntries(await Promise.all(assetNames.map(async name => [name, await readFile(new URL(`./${name}`, import.meta.url), "utf8")])));
const template = await readFile(new URL("./worker-template.mjs", import.meta.url), "utf8");
const output = template.replace("__ASSET_MAP__", JSON.stringify(assets));
if (output === template) throw new Error("Asset map placeholder was not found.");
await mkdir(new URL("./dist/server/", import.meta.url), { recursive: true });
await writeFile(new URL("./dist/server/index.js", import.meta.url), output, "utf8");
console.log(`Built Worker with ${assetNames.length} embedded assets.`);
