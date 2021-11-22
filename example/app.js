// Import Deps
const express = require("express");
const bodyParser = require("body-parser");
const consolidate = require("consolidate");

// Salla Actions API
const SallaActions = require("../src/Actions");

// initialize app
const port = 8081;
let eventsStack = [];
const app = express();

// configure Express
app.set("views", __dirname + "/views");
app.set("view engine", "html");

// set the render engine to nunjucks
app.engine("html", consolidate.nunjucks);
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

require("dotenv").config();
/*
  Create a .env file in the root directory of your project. 
  Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
  WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ...
*/
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
SallaActions.setSecret(WEBHOOK_SECRET);

// add webhook listener
SallaActions.addListener("app.installed", (eventBody, userArgs) => {
  eventsStack.push(eventBody);
});

// POST /webhooks/notifiy
app.post("/webhooks/notifiy", function (req, res) {
  SallaActions.checkActions(req.body, req.headers.authorization, {
    /* your args to pass to action files or listeners */
  });
});
app.get("/", function (req, res) {
  res.render("index.html", {});
});
app.get("/events", function (req, res) {
  res.send(eventsStack);
  eventsStack = [];
});
app.listen(port, function () {
  console.log("App is listening on port " + port);
});
