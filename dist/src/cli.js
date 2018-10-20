#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var argv = require('yargs')
    .demandCommand(1)
    .describe('reducers', 'Directory for reducers')
    .alias('r', 'reducers')
    .nargs('r', 1).argv;
var args = process.argv.slice(2);
if (args.length === 0) {
    console.log('ts2redux <directory>');
    process.exit();
}
index_1.createProject({
    path: args[0],
    reducerPath: argv.reducers || 'reducers'
});
//# sourceMappingURL=cli.js.map