const Build = require("../db/build");
const Part = require("../db/part");
const User = require("../db/user");

const mapPart = require("./part");
const mapUser = require("./user");

const Config = function (id, name, createdBy, parts) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.parts = parts;
};

module.exports = (build) =>
    Promise.all([
        Part.find({
            _id: {
                $in: build.partIds,
            },
        }).exec(),
        User.findOne({
            _id: build.ownerId,
        }).exec(),
    ]).then((results) => {
        const parts = results[0];
        const user = results[1];
        return new Config(
            build._id.toString(),
            build.name,
            mapUser(user),
            parts.map(mapPart)
        );
    });
