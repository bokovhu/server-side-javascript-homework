const path = require("path");
const login = require("./endpoint/login");
const logout = require("./endpoint/logout");
const createConfig = require("./endpoint/config/createConfig");
const registerUser = require("./endpoint/user/registerUser");
const deleteConfig = require("./endpoint/config/deleteConfig");
const modifyConfig = require("./endpoint/config/modifyConfig");
const selectPartInConfig = require("./endpoint/config/selectPartInConfig");

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

    app.get("/edit-configuration/:id", (req, res, next) => {
        res.render("edit-configuration");
    });

    app.get("/new-configuration", (req, res, next) => {
        res.render("new-configuration");
    });

    app.get("/part-search", (req, res, next) => {
        res.render("part-search");
    });

    app.post("/api/config/create", createConfig);
    app.post("/api/user/register", registerUser);
    app.delete("/api/config/:id", deleteConfig);
    app.put("/api/config/:id", modifyConfig);
    app.post("/api/config/:id/parts", selectPartInConfig);
}

module.exports = addStaticPageRoutes;
