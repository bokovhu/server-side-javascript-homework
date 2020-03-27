const fs = require("fs");
const crypto = require("crypto");

const generateAndWriteJWTSecret = file => {
    secret = crypto.randomBytes(32);
    fs.writeFileSync(file, secret);
};

const readJWTSecretFromFile = (app, config) => {
    app.locals.jwtSecret = fs.readFileSync(config.jwtSecretFile);
};

const initJWTSecret = (app, config) => {
    if (!fs.existsSync(config.jwtSecretFile)) {
        console.log(
            `JWT secret file ${config.jwtSecretFile} does not exist, generating new secret ...`
        );
        generateAndWriteJWTSecret(config.jwtSecretFile);
    }
    readJWTSecretFromFile(app, config);
    console.log("JWT secret initialized");
};

// This function initializes the secret
// for signing and verifying JWTs. It
// first tries to load the secret from
// the file that is specified by
// config.jwtSecretFile. If this file
// cannot be found, a new random secret
// is generated. The JWT secret value
// is set as an application local
// parameter.
module.exports = initJWTSecret;
