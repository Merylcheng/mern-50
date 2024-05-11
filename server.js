const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const debug = require("debug")("mern:server");

require("dotenv").config();
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "dist", "vite.svg")));
app.use(express.static(path.join(__dirname, "dist")));

// Put API routes here, before the "catch all" route
//use to check if server crash
app.get("/api", (req, res) => {
  res.json({ hello: "world" });
});

app.use("/api/users", require("./routes/api/usersRoutes"));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
