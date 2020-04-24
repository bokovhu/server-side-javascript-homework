const logRequest = require("../logRequest");
const LOGTAG = "Config Loader middleware";

const Build = require("../db/build");

const mapConfig = require("../model/config");

module.exports = (middlewareConfiguration) => {
    return (req, res, next) => {
        Build.findOne({
            _id: req.params.id,
        })
            .then((build) => mapConfig(build))
            .then((config) => {
                res.locals.config = config;
                next();
            });
    };
};
