const express = require("express");
const conf = require("./src/config");
const initJWTSecret = require('./src/initJwtSecret');
const addStaticRoutes = require("./src/routes");
const addAllMiddleware = require("./src/middleware");
const path = require("path");

const app = express();

// Setup static middleware for routes /static/...
app.use("/static", express.static(conf.staticDir));

// Setup template rendering
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

// Initialize JWT secret
initJWTSecret(app, conf);

// Add all used middleware
addAllMiddleware(app);

// Add the static pages' routes for now
addStaticRoutes(app);

// Start server
app.listen(conf.port, () => {
    console.log(`Listening on ${conf.port} ...`);
});
