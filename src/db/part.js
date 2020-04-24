const Schema = require("mongoose").Schema;
const db = require("./database");

const Part = db.model("Part", {
    type: String,
    manufacturer: {
        name: String,
        website: String,
    },
    model: String,
    specification: String,
    technicalParameters: [
        {
            name: String,
            unit: String,
            value: {
                text: String,
                bytes: Number,
                herz: Number,
                bits: Number,
                watts: Number,
                count: Number,
                has: Boolean,
                bps: Number
            },
        },
    ],
});

module.exports = Part;
