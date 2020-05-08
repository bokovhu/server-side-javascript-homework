const Part = require("../../db/part");
const Build = require("../../db/build");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (req, res, next) => {
    const ownerId = res.locals.userId;
    const modifiedData = {
        name: req.body.configName,
        partIds: req.body.partIds.map((idString) => new ObjectId(idString)),
    };

    Build.findOne({
        _id: req.params.id,
    }).then(
        (build) => {
            if (!build) {
                res.status(404).end();
                return;
            }

            if (build.ownerId.toString() !== ownerId) {
                res.status(403).end();
                return;
            }

            build.partIds = [...modifiedData.partIds];
            build.name = modifiedData.name;
            build.save();

            res.status(200).json(build);
        },
        (reason) => res.status(400).json(reason)
    );
};
