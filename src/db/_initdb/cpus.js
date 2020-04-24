const techParam = require("./techParam");
const GHz = techParam.GHz;
const Watts = techParam.Watts;
const GB = techParam.GB;
const count = techParam.count;
const text = techParam.text;

const manufacturers = require("./manufacturers");
const Intel = manufacturers.Intel;
const AMD = manufacturers.AMD;

const Part = require("../part");

module.exports = () =>
    Part.create(
        {
            type: "CPU",
            manufacturer: Intel,
            model: "Core i7-9700K",
            specification: "3.6 GHz 8-Core",
            technicalParameters: [
                GHz("Core Clock", 3.6),
                GHz("Boost Clock", 4.9),
                Watts("TDP", 95),
                text("Socket", "LGA1151"),
                GB("Max memory", 128),
                count("Core Count", 8),
            ],
        },
        {
            type: "CPU",
            manufacturer: AMD,
            model: "Ryzen 7 3700X",
            specification: "3.6 GHz 8-Core",
            technicalParameters: [
                GHz("Core Clock", 3.6),
                GHz("Boost Clock", 4.4),
                Watts("TDP", 65),
                text("Socket", "AM4"),
                GB("Max memory", 128),
                count("Core Count", 8),
            ],
        }
    );
