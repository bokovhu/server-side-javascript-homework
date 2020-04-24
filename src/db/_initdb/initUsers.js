const initJWTSecret = require("../../initJwtSecret");
const User = require("../user");
const bcrypt = require("bcrypt");

module.exports = User.deleteMany({}).then(() =>
    User.create({
        name: "John Doe",
        emailAddress: "john.doe@email.test",
        passwordHash: bcrypt.hashSync("qwe123", 12),
        ownConfigIds: [],
    })
);
