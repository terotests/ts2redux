"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_simple_ast_1 = require("ts-simple-ast");
var project = new ts_simple_ast_1.default();
var sourceFile = project.createSourceFile("test.ts", "\nfunction test()  {\n  return 555\n}\n");
sourceFile.getFunctions().forEach(function (f) {
    console.log(f.print());
});
//# sourceMappingURL=bug.js.map