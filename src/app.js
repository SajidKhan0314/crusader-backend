require("./database/database");
require("./seed/userSeed");
const express = require("express");
var cors = require("cors");
const app = express();

//Router imports
const aboutRouter = require("./router/about");
const coderRouter = require("./router/coder");
const statusRouter = require("./router/status");
const mintStatusRouter = require("./router/mintStatus");
const project = require("./router/project");
const projectTypeRouter = require("./router/projectType");
const userRouter = require("./router/user");

app.use(express.json());
app.use(cors());

//Routers
app.use(aboutRouter);
app.use(coderRouter);
app.use(statusRouter);
app.use(mintStatusRouter);
app.use(project);
app.use(projectTypeRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.send({ message: "Working!" });
});

module.exports = app;
