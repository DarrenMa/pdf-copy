/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const removePdfPassword = require('remove-pdf-password');
const {
  basename, resolve, dirname, join,
} = require('path');
const { readdir } = require('fs').promises;
require('dotenv').config();

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      console.log(`Dir: ${res}`);
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

(async () => {
  try {
    console.log('starting');
    for await (const f of getFiles(process.env.STORAGE)) {
      const dirPath = dirname(f);
      const fileName = basename(f);
      // const newName = basename(f).replace(/ /g, '');
      const newPath = join(process.env.OUTPUT_STORAGE, fileName);
      console.log(`full path: ${f}`);
      console.log(`dirname: ${dirPath}`);
      console.log(`filename: ${fileName}`);
      // console.log(`new name: ${newName}`);
      console.log(`new path: ${newPath}`);
      const params = {
        inputFilePath: f,
        password: process.env.PASSWORD,
        outputFilePath: newPath,
      };
      console.log(`decrypting: ${f} to ${newPath}`);
      removePdfPassword(params);
      console.log('decrypting file done');
    }
    console.log('finished');
  } catch (error) {
    console.error(`${error}`);
  }
})();
