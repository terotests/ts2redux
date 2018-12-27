#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var chokidar = require("chokidar");
var path = require('path');
var argv = require('yargs')
    .demandCommand(1)
    .describe('reducers', 'Directory for reducers')
    .alias('r', 'reducers')
    .nargs('r', 1)
    .describe('nodevtools', 'Disable Redux Devtools integration from the React Context API components')
    .alias('n', 'nodevtools')
    .describe('watch', 'Watch directory for changes')
    .alias('w', 'watch')
    .argv;
var args = process.argv.slice(2);
if (args.length === 0) {
    console.log('ts2redux <directory>');
    process.exit();
}
var state = {
    is_running: false
};
var compileProject = function (eventArgs) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (state.is_running)
                    return [2 /*return*/];
                console.log('ts2redux: compiling path: ', args[0]);
                state.is_running = true;
                return [4 /*yield*/, index_1.createProject({
                        path: args[0],
                        reducerPath: argv.reducers || 'reducers',
                        disableDevtoolsFromContext: argv.n,
                        onlyFile: eventArgs ? path.basename(eventArgs) : undefined
                    })];
            case 1:
                _a.sent();
                setTimeout(function () {
                    state.is_running = false;
                }, 100);
                return [2 /*return*/];
        }
    });
}); };
var start = function () { return __awaiter(_this, void 0, void 0, function () {
    var watcher;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, compileProject(null)];
            case 1:
                _a.sent();
                if (argv.watch) {
                    watcher = chokidar.watch(args[0], {
                        ignored: '*.tsx'
                    });
                    watcher
                        .on('add', compileProject)
                        .on('change', compileProject)
                        .on('unlink', compileProject);
                }
                return [2 /*return*/];
        }
    });
}); };
start();
//# sourceMappingURL=cli.js.map