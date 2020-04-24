const path = require("path");
const JWT = require("jsonwebtoken");

const User = require("../db/user");
const bcrypt = require("bcrypt");

const getLogin = (req, res, next) => {
    res.render("login");
};

const onAuthDetailsValid = (req, res, user) => {
    const token = JWT.sign({ uid: user._id }, req.app.locals.jwtSecret, {
        algorithm: "HS256",
    });
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
    });

    if (req.query.back) {
        res.redirect(req.query.back);
    } else {
        res.redirect("/");
    }
};

const onAuthDetailsInvalid = (req, res, user) => {
    res.redirect("/login?error=true");
};

const postLogin = (req, res, next) => {
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;

    if (!email || !password) {
        onAuthDetailsInvalid(req, res, null);
    } else {
        User.findOne({
            emailAddress: email,
        }).then(
            (user) => {
                if (!user) {
                    onAuthDetailsInvalid(req, res, null);
                } else {
                    bcrypt.compare(
                        password,
                        user.passwordHash,
                        (err, valid) => {
                            if (valid) {
                                onAuthDetailsValid(req, res, user);
                            } else {
                                onAuthDetailsInvalid(req, res, user);
                            }
                        }
                    );
                }
            },
            (reason) => {
                onAuthDetailsInvalid(req, res, null);
            }
        );
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
