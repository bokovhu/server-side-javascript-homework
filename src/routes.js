const path = require("path");
const login = require("./endpoint/login");
const logout = require("./endpoint/logout");
const createConfig = require("./endpoint/config/createConfig");

function addStaticPageRoutes(app) {
    app.get("/", (req, res, next) => {
        res.render("index");
    });

    app.get("/sign-up", (req, res, next) => {
        res.render("sign-up");
    });

    app.get("/thanks-for-signing-up", (req, res, next) => {
        res.render("thanks-for-signing-up");
    });

    app.use("/login", login);

    app.use("/logout", logout);

    app.get("/my-configs", (req, res, next) => {
        res.render("my-configs");
    });

    app.get("/open-configuration/:id", (req, res, next) => {
        res.render("open-configuration");
    });

    app.get("/new-configuration", (req, res, next) => {
        res.render("new-configuration");
    });

    app.post("/api/config/create", createConfig);
}

module.exports = addStaticPageRoutes;
