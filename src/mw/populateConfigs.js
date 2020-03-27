const logRequest = require('../logRequest');
const LOGTAG = 'Config Populator middleware';

// A middleware, that populates the configurations
// in the current request. Can be used to retreive
// the current user's own configurations, or to
// retreive a list of all stored configs. The list
// of computer configs is made available as a
// request-local parameter
module.exports = (config) => {
    return (req, res, next) => {

        logRequest(req, LOGTAG, 'Intercepting request');

        // TODO: Implement
        next ();
    }
}