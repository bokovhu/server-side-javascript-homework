const logRequest = require('../logRequest');
const LOGTAG = 'Part Populator middleware';

// This middleware populates the list of a
// given type of computer parts. Can be
// configured to populate based on filtering,
// or to retreive all parts of a given type.
module.exports = (options) => {
    return (req, res, next) => {

        logRequest(req, LOGTAG, 'Intercepting request');

        // TODO: Implement
        next ();
    }
}