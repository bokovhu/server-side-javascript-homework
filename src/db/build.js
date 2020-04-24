const Schema = require("mongoose").Schema;
const db = require("./database");

const Build = db.model("Build", {
    ownerId: Schema.Types.ObjectId,
    name: String,
    partIds: [Schema.Types.ObjectId],
});

module.exports = Build;
