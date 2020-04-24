const initParts = require("./initParts");
const initUsers = require("./initUsers");

initParts.then(() => initUsers).then(() => process.exit(0));
