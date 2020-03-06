const express = require("express");
const conf = require("./src/config");
const addStaticRoutes = require('./src/routes');
const path = require('path');

const app = express();

// Setup static middleware for routes /static/...
app.use("/static", express.static(conf.staticDir));

// Add the static pages' routes for now
addStaticRoutes (app);

// Start server
app.listen(conf.port, () => {
    console.log(`Listening on ${conf.port} ...`);
});
