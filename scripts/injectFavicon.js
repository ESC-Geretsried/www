const { readFile, writeFile } = require("fs/promises");
const realFaviconConfig = require("../favicon.data.json");

const pathToHead = "./src/app/head.tsx";

const run = async () => {
  const htmlToInject = realFaviconConfig.favicon.html_code
    .split("\n")
    .map((line) => line.replace(">", "/>"))
    .map((line) => line.replace('\\"', '"'))
    .join("\n");

  const headBuffer = await readFile(pathToHead);

  const head = headBuffer.toString();

  const injectedHead = head.replace("<favicon />", htmlToInject);

  await writeFile(pathToHead, injectedHead);
};

run();
