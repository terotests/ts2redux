#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var argv = require('yargs')
    .demandCommand(1)
    .describe('reducers', 'Directory for reducers')
    .alias('r', 'reducers')
    .nargs('r', 1)
    .describe('nodevtools', 'Disable Redux Devtools integration from the React Context API components')
    .alias('n', 'nodevtools')
    .argv;
var args = process.argv.slice(2);
if (args.length === 0) {
    console.log('ts2redux <directory>');
    process.exit();
}
index_1.createProject({
    path: args[0],
    reducerPath: argv.reducers || 'reducers',
    disableDevtoolsFromContext: argv.n,
});
//# sourceMappingURL=cli.js.map