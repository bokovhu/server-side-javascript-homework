const path = require("path");
const login = require('./endpoint/login');

function addStaticPageRoutes(app) {
    app.get("/", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, "../pages/index.html"));
    });

    app.get("/as-logged-in", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, "../pages/index-logged-in.html"));
    });

    app.get("/sign-up", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, "../pages/sign-up.html"));
    });

    app.get("/thanks-for-signing-up", (req, res, next) => {
        res.sendFile(
            path.resolve(__dirname, "../pages/thanks-for-signing-up.html")
        );
    });

    app.use('/login', login);

    app.get("/logout", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, "../pages/logout.html"));
    });

    app.get("/my-configs", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, "../pages/my-configs.html"));
    });

    app.get("/open-configuration", (req, res, next) => {
        res.sendFile(
            path.resolve(__dirname, "../pages/open-configuration.html")
        );
    });

    app.get("/new-configuration", (req, res, next) => {
        res.sendFile(
            path.resolve(__dirname, "../pages/new-configuration.html")
        );
    });
}

module.exports = addStaticPageRoutes;
