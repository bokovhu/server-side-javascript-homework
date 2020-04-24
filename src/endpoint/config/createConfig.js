const Part = require("../../db/part");
const Build = require("../../db/build");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (req, res, next) => {
    const owner = res.locals.user;
    const newBuild = {
        ownerId: owner._id,
        name: req.body.configName,
        partIds: req.body.partIds.map((idString) => new ObjectId(idString)),
    };

    Build.create(newBuild).then(
        (createdBuild) => {
            res.status(201);
            res.json(createdBuild);
        },
        (reason) => {
            res.status(400);
            res.json(reason);
        }
    );
};
