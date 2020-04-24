const techParam = require("./techParam");
const GB = techParam.GB;
const MHz = techParam.MHz;
const text = techParam.text;
const count = techParam.count;
const has = techParam.has;
const Watts = techParam.Watts;

const manufacturers = require("./manufacturers");
const Asus = manufacturers.Asus;
const Gigabyte = manufacturers.Gigabyte;

const Part = require("../part");

module.exports = Part.create(
    {
        type: "GPU",
        manufacturer: Gigabyte,
        model: "WINDFORCE OC 3X RTX 2070 SUPER",
        specification: "8GB GDDR6",
        technicalParameters: [
            GB("VRAM", 8),
            text("VRAM Type", "GDDR6"),
            MHz("Core Clock", 1605),
            MHz("Boost Clock", 1785),
            MHz("Effective Memory Clock", 14000),
            text("Interface", "PCI-E x16"),
            Watts("TDP", 215),
            has("SLI Capable", true),
            count("HDMI", 1),
            count("DisplayPort", 3),
        ],
    },
    {
        type: "GPU",
        manufacturer: Asus,
        model: "Radeon RX 570 ROG STRIX",
        specification: "4GB GDDR5",
        technicalParameters: [
            GB("VRAM", 4),
            text("VRAM Type", "GDDR5"),
            MHz("Core Clock", 1168),
            MHz("Boost Clock", 1310),
            MHz("Effective Memory Clock", 7000),
            text("Interface", "PCI-E x16"),
            Watts("TDP", 150),
            count("HDMI", 1),
            count("DisplayPort", 1),
            count("DVI", 2),
        ],
    }
);
