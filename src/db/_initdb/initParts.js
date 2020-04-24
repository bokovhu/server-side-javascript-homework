const cpus = require("./cpus");
const rams = require("./rams");
const motherboards = require("./motherboards");
const gpus = require("./gpus");
const storageDevices = require("./storageDevices");
const Part = require("../part");

module.exports = Part.deleteMany({})
    .then(cpus)
    .then(rams)
    .then(motherboards)
    .then(gpus)
    .then(storageDevices);
