const Part = require("../../db/part");
const Build = require("../../db/build");

module.exports = (req, res, next) => {
    const ownerId = res.locals.userId;
    const configId = req.params.id;
    const partId = req.query.partId;
    const oldPartId = req.query.oldPartId;

    Build.findOne({
        _id: configId,
    }).then((build) => {
        let newPartIds = build.partIds.map((pId) => {
            if (pId.toString() === oldPartId) {
                return partId;
            }
            return pId;
        });

        build.partIds = [...newPartIds];
        build.save();

        res.status(200).json(build);
    });
};
