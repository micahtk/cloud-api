#!/usr/bin/env node

import {
  createCommandLineInterface,
  createLeaf,
  createJsonOption,
  createBranch,
} from '@alwaysai/always-cli';
import { createWebApi } from './create-web-api';
import { specs } from './specs';

const subcommands = Object.entries(specs).map(([methodName, { description }]) => {
  return createLeaf({
    commandName: methodName,
    description,
    options: {
      args: createJsonOption({ description: 'Arguments as JSON array string' }),
    },
    async action({ args }) {
      const webApi = createWebApi();
      const method = (webApi as any)[methodName];
      const result = await method(...(args || []));
      return result;
    },
  });
});

const root = createBranch({
  commandName: 'alwaysai-web-api',
  description: 'Call the alwaysAI Web API',
  subcommands,
});

const commandLineInterface = createCommandLineInterface(root);

if (module === require.main) {
  commandLineInterface();
}
