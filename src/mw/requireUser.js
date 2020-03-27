const logRequest = require("../logRequest");
const LOGTAG = "Require User middleware";

// A middleware that requires a valid login
// to allow the request to continue. If the
// current request is not authenticated, this
// middleware redirects the user to the login
// page
module.exports = options => {
    return (req, res, next) => {
        logRequest(req, LOGTAG, "Intercepting request");

        if (!res.locals.authenticated) {
            logRequest(
                req,
                LOGTAG,
                "User is not authenticated, redirecting to login"
            );
            res.redirect("/login");
        } else {
            logRequest(req, LOGTAG, "User is authenticated, allowing access");
            next();
        }
    };
};
