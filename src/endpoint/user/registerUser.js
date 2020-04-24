const User = require("../../db/user");
const bcrypt = require("bcrypt");

module.exports = (req, res, next) => {
    User.find({
        emailAddress: req.body.emailAddress,
    })
        .then((resultsByEmail) => {
            if (resultsByEmail.length != 0) {
                return Promise.reject(
                    "A user is already registered with this e-mail!"
                );
            }
        })
        .then(
            () =>
                User.create({
                    name: req.body.name,
                    emailAddress: req.body.emailAddress,
                    passwordHash: bcrypt.hashSync(req.body.password, 12),
                }),
            (reason) => {
                res.locals.error = reason;
                res.status(400);
                res.render("error");
                return;
            }
        )
        .then((user) => {
            res.status(200);
            res.json(user);
            next();
            return;
        });
};
