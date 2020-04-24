const techParam = require("./techParam");
const GB = techParam.GB;
const text = techParam.text;
const has = techParam.has;
const MBps = techParam.MBps;

const manufacturers = require("./manufacturers");
const Samsung = manufacturers.Samsung;
const Kingston = manufacturers.Kingston;

const Part = require("../part");

module.exports = Part.create(
    {
        type: "STORAGE",
        manufacturer: Samsung,
        model: "970 Evo",
        specification: "500GB M.2 SSD",
        technicalParameters: [
            GB("Capacity", 500),
            text("Type", "SSD"),
            text("Size", "M.2"),
            text("Interface", "PCI-E"),
            has("NVMe", true),
            MBps("Read speed", 3400),
            MBps("Write speed", 2300),
        ],
    },
    {
        type: "STORAGE",
        manufacturer: Kingston,
        model: "A400",
        specification: '2.5" 240GB SATA3 SSD',
        technicalParameters: [
            GB("Capacity", 240),
            text("Type", "SSD"),
            text("Size", '2.5"'),
            text("Interface", "SATA3"),
            MBps("Read speed", 500),
            MBps("Write speed", 350),
        ],
    }
);
