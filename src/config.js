const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "static";
const JWT_SECRET_FILE = process.env.JWT_SECRET_FILE || '.jwt-secret';

module.exports = {
    port: PORT,
    staticDir: STATIC_DIR,
    jwtSecretFile: JWT_SECRET_FILE
};
