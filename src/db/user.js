const Schema = require("mongoose").Schema;
const db = require("./database");

const User = db.model("User", {
    name: String,
    emailAddress: String,
    passwordHash: String,
    ownConfigIds: [Schema.Types.ObjectId],
});

module.exports = User;
