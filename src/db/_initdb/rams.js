const techParam = require("./techParam");
const GB = techParam.GB;
const MHz = techParam.MHz;
const text = techParam.text;
const count = techParam.count;

const manufacturers = require("./manufacturers");
const Corsair = manufacturers.Corsair;
const GSkill = manufacturers.GSkill;

const Part = require("../part");

module.exports = Part.create(
    {
        type: "RAM",
        manufacturer: Corsair,
        model: "Vengeance RGB Pro",
        specification: "16 GB DDR4-3200",
        technicalParameters: [
            GB("Capacity", 16),
            MHz("Speed", 3200),
            count("Modules", 2),
            text("Type", "DDR4"),
            text("Connector", "DIMM-288"),
        ],
    },
    {
        type: "RAM",
        manufacturer: Corsair,
        model: "Vengeance RGB Pro",
        specification: "32 GB DDR4-3200",
        technicalParameters: [
            GB("Capacity", 32),
            MHz("Speed", 3200),
            count("Modules", 2),
            text("Type", "DDR4"),
            text("Connector", "DIMM-288"),
        ],
    },
    {
        type: "RAM",
        manufacturer: GSkill,
        model: "Ripjaws V Series",
        specification: "16 GB DDR4-3200",
        technicalParameters: [
            GB("Capacity", 16),
            MHz("Speed", 3200),
            count("Modules", 2),
            text("Type", "DDR4"),
            text("Connector", "DIMM-288"),
        ],
    }
);
