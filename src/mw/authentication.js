const logRequest = require("../logRequest");
const JWT = require("jsonwebtoken");

const User = require("../db/user");
const ObjectId = require("mongoose").Types.ObjectId;

const LOGTAG = "Authentication middleware";

// A middleware that authenticates the user.
// If a Cookie called 'jwt' is found in the request,
// it parses this JWT, validates the signature,
// and sets user information in the request-local
// parameters object.
// If a JWT is found in the request, but cannot
// be verified, the user is redirected to an
// error page.
module.exports = (options) => {
    return (req, res, next) => {
        logRequest(req, LOGTAG, "Intercepting request");

        const requestJwtToken = req.cookies.jwt;
        logRequest(req, LOGTAG, `Request JWT: ${requestJwtToken}`);
        if (requestJwtToken) {
            // Request contains a JWT token, verify it
            JWT.verify(
                requestJwtToken,
                req.app.locals.jwtSecret,
                {
                    // Using HMAC-SHA256 algorithm for the sake of simplicity
                    algorithms: ["HS256"],
                },
                (err, requestJwt) => {
                    if (err) {
                        // JWT could not be verified
                        // It is either expired, or signed with the wrong key
                        // Or it just has an invalid format
                        logRequest(
                            req,
                            LOGTAG,
                            `Invalid JWT in request, error: ${err}`
                        );
                        res.locals.authenticated = false;
                        res.redirect("/error-invalid-jwt");
                    } else {
                        User.findById(new ObjectId(requestJwt.uid)).then(
                            (user) => {
                                logRequest(
                                    req,
                                    LOGTAG,
                                    `User authenticated, user ID: ${requestJwt.uid}`
                                );
                                res.locals.userId = requestJwt.uid;
                                res.locals.user = user;
                                res.locals.authenticated = true;

                                // JWT verified, user can be considered
                                // as an authenticated principal
                                next();
                            },
                            (reason) => {
                                res.locals.error = reason;
                                res.render("error");
                            }
                        );
                    }
                }
            );
        } else {
            // No JWT is found in the request, allow to continue
            // Authorization middleware will intercept the request
            // and filter unauthenticated requests, if required

            logRequest(
                req,
                LOGTAG,
                "No JWT in the request, user not authenticated"
            );
            res.locals.authenticated = false;
            next();
        }
    };
};
