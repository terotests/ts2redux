#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var args = process.argv.slice(2);
if (args.length === 0) {
    console.log('ts2redux <directory>');
    process.exit();
}
index_1.createProject({
    path: args[0]
});
//# sourceMappingURL=cli.js.map