import * as express from "express";
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static("public"));

if (!module.parent) {
  app.listen(1337);
  console.log("listening on port 1337");
}
