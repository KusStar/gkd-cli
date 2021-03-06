import Listr from 'listr'
import chalk from 'chalk'
import { logSuccess } from './utils/log'
import { validateArgs } from './utils/validator'
import { copyFiles } from './utils/io'


export interface Flags {
  template: string;
  author: {
      name: string;
      page: string;
  };
}

export interface Context extends Flags {
  appName: string;
}

export default async (input: string[], flags: Flags) => {
  const ctx = await validateArgs(input[0], flags)
  const { appName, template } = ctx
  const tasks = new Listr([
    {
      title: `Generate template: ${chalk.cyan(template)}`,
      task: () => null,
    },
    {
      title: 'Copy files',
      task: () => copyFiles(ctx),
    },
    {
      title: 'Success',
      task: () => console.log(),
    },
  ])

  tasks
    .run()
    .then(() => logSuccess(appName))
    .catch((error: Error) => {
      console.error(error.stack)
      process.exit(1)
    })
}
