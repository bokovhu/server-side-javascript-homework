const logRequest = require('../logRequest');
const LOGTAG = 'Part Filter Populator middleware';

// This middleware populates the available
// filters for a given part type.
module.exports = (options) => {
    return (req, res, next) => {

        logRequest(req, LOGTAG, 'Intercepting request');

        // TODO: Implement
        next ();
    }
}