import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { clearItem, store } from './lib/config';
import { REPO_KEY, TOKEN_KEY } from './lib/constants';
import { createFile } from './lib/file';
import { gen } from './lib/gen';
import { askPrismicCredentials } from './lib/input';
import prismicService from './services/prismicService';
const argv = require('minimist')(process.argv.slice(2));

const main = async () => {
  clear();

  console.log(
    chalk.yellow(
      figlet.textSync('Prismic TS Gen', { horizontalLayout: 'full' })
    )
  );

  if (argv.i) {
    clearItem(TOKEN_KEY);
    clearItem(REPO_KEY);
  }

  if (!store.get(TOKEN_KEY) || !store.get(REPO_KEY)) {
    const creds = await askPrismicCredentials();
    store.set(TOKEN_KEY, creds.apiToken);
    store.set(REPO_KEY, creds.repository);
  }

  if (argv.d) {
    const docType = argv.d;
    let outputPath = '';

    if (argv.o) {
      outputPath = argv.o;
    } else {
      outputPath = `./prismic-types/${docType}.ts`;
    }

    const response = await prismicService.getDocumentByType(docType);
    const result = await gen(JSON.stringify(response));
    createFile(result, outputPath);
  }
};

main();
