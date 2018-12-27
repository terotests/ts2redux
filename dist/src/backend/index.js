"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static("public"));
if (!module.parent) {
    app.listen(1337);
    console.log("listening on port 1337");
}
//# sourceMappingURL=index.js.map