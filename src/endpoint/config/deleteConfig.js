const Build = require("../../db/build");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (req, res, next) => {
    const buildId = req.params.id;
    const userId = res.locals.userId;

    Build.findOne({
        _id: buildId,
    }).then(
        (build) => {

            if (!build) {
                res.status(404).end();
                return;
            }

            if (build.ownerId.toString () !== userId) {
                res.status(403).end();
                return;
            }

            Build.deleteOne({
                _id: buildId,
            }).then(
                () => res.status(204).end(),
                (reason) => res.status(500).json(reason)
            );
        },
        (reason) => res.status(400).json(reason)
    );
};
