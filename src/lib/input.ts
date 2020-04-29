const inquirer = require('inquirer');

interface Credentials {
  apiToken: string;
  repository: string;
}

export const askPrismicCredentials = (): Credentials => {
  const questions = [
    {
      name: 'repository',
      type: 'input',
      message: 'Enter your Prismic repository name',
      validate: function (value: string) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your repository name.';
        }
      },
    },
    {
      name: 'apiToken',
      type: 'input',
      message: 'Enter your Prismic api token:',
      validate: function (value: string) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your api token.';
        }
      },
    },
  ];
  return inquirer.prompt(questions) as Credentials;
};
