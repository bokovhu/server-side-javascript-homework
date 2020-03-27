const path = require("path");
const JWT = require("jsonwebtoken");

const getLogin = (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "../../pages/login.html"));
};

const postLogin = (req, res, next) => {
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;

    if (!email || !password) {
        // TODO: Better solution
        // Should also be checked in the form
        res.redirect("/login?error=true");
    } else {
        // TODO: Implement proper authentication
        const token = JWT.sign({ uid: email }, req.app.locals.jwtSecret, {
            algorithm: "HS256"
        });
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60)
        });

        if (req.query.back) {
            res.redirect(req.query.back);
        } else {
            res.redirect("/");
        }
    }
};

module.exports = (req, res, next) => {
    if (req.method === "GET") {
        getLogin(req, res, next);
    } else if (req.method === "POST") {
        postLogin(req, res, next);
    } else {
        // ???
        next();
    }
};
