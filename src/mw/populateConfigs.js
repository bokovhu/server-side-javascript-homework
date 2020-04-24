const logRequest = require("../logRequest");
const LOGTAG = "Config Populator middleware";

const Build = require("../db/build");

const mapConfig = require("../model/config");

// A middleware, that populates the configurations
// in the current request. Can be used to retreive
// the current user's own configurations, or to
// retreive a list of all stored configs. The list
// of computer configs is made available as a
// request-local parameter
module.exports = (config) => {
    return (req, res, next) => {

        let buildFindPromise = null;

        if (config.onlyCurrentUsers) {
            buildFindPromise = Build.find({
                ownerId: res.locals.userId,
            }).exec();
        } else {
            buildFindPromise = Build.find({}).exec();
        }

        buildFindPromise
            .then((builds) =>
                Promise.all(builds.map((build) => mapConfig(build)))
            )
            .then((configs) => {
                res.locals.configs = configs;
                next();
            });
    };
};
