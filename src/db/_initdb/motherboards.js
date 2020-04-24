const techParam = require("./techParam");
const text = techParam.text;
const count = techParam.count;
const has = techParam.has;
const Mbps = techParam.Mbps;
const Gbps = techParam.Gbps;

const manufacturers = require("./manufacturers");
const Asus = manufacturers.Asus;
const MSI = manufacturers.MSI;

const Part = require("../part");

module.exports = Part.create(
    {
        type: "MOTHERBOARD",
        manufacturer: Asus,
        model: "ROG MAXIMUS XI HERO",
        specification: "Z390 LGA1151",
        technicalParameters: [
            text("CPU Socket", "LGA1151"),
            text("Form Factor", "ATX"),
            text("Chipset", "Intel Z390"),
            count("Memory slots", 4),
            text("Memory type", "DDR4"),
            count("PCI-E x16 Slots", 3),
            count("PCI-E x1 Slots", 1),
            count("M.2 Slots", 2),
            count("SATA", 6),
            Mbps("Onboard Ethernet", 1000),
            has("Onboard USB3.0", true),
            has("ECC Support", false),
            has("WiFi", false),
            has("RAID Support", true),
        ],
    },
    {
        type: "MOTHERBOARD",
        manufacturer: Asus,
        model: "ROG Crosshair VIII Formula",
        specification: "X570 AM4",
        technicalParameters: [
            text("CPU Socket", "AM4"),
            text("Form Factor", "ATX"),
            text("Chipset", "AMD X570"),
            count("Memory slots", 4),
            text("Memory type", "DDR4"),
            count("PCI-E x16 Slots", 3),
            count("PCI-E x1 Slots", 1),
            count("M.2 Slots", 2),
            count("SATA", 8),
            Mbps("Onboard Ethernet #1", 1000),
            Gbps("Onboard Ethernet #2", 5),
            has("Onboard USB3.0", true),
            has("ECC Support", false),
            has("WiFi", true),
            has("RAID Support", true),
        ],
    },
    {
        type: "MOTHERBOARD",
        manufacturer: MSI,
        model: "B450 Gaming Plus Max",
        specification: "B450 AM4",
        technicalParameters: [
            text("CPU Socket", "AM4"),
            text("Form Factor", "ATX"),
            text("Chipset", "AMD B450"),
            count("Memory slots", 4),
            text("Memory type", "DDR4"),
            count("PCI-E x16 Slots", 2),
            count("PCI-E x1 Slots", 4),
            count("M.2 Slots", 1),
            count("SATA", 6),
            Mbps("Onboard Ethernet", 1000),
            has("Onboard USB3.0", true),
            has("ECC Support", false),
            has("WiFi", false),
            has("RAID Support", false),
        ],
    }
);
