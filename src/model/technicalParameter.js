function scaledUnitValue(value, unit, suffix) {
    if (/[a-z]+\.[A-Z]+/.test(unit)) {
        const scale = unit.split(/\./)[1];
        switch (scale) {
            case "K":
                return `${value / 1000} K${suffix}`;
            case "M":
                return `${value / 1000 / 1000} M${suffix}`;
            case "G":
                return `${value / 1000 / 1000 / 1000} G${suffix}`;
            case "T":
                return `${value / 1000 / 1000 / 1000 / 1000} T${suffix}`;
        }
    }
    return `${value} ${suffix}`;
}

const Units = {
    count: {
        transform: (v) => v.count,
    },
    text: {
        transform: (v) => v.text,
    },
    has: {
        transform: (v) => (v.has ? "Yes" : "No"),
    },
    herz: {
        transform: (v, u) => scaledUnitValue(v.herz, u, "Hz"),
    },
    bytes: {
        transform: (v, u) => scaledUnitValue(v.bytes, u, "B"),
    },
    bits: {
        transform: (v, u) => scaledUnitValue(v.bits, u, "b"),
    },
    watts: {
        transform: (v, u) => scaledUnitValue(v.watts, u, "W"),
    },
    bps: {
        transform: (v, u) =>
            u.endsWith("B")
                ? scaledUnitValue(v.bps / 8, u.substring(0, u.length - 1), "B / s")
                : scaledUnitValue(v.bps, u, "b / s"),
    },
};

const TechnicalParameter = function (name, unit, value) {
    this.name = name;

    let matchedUnits = Object.keys(Units).filter((u) => unit.startsWith(u));
    if (matchedUnits.length > 0) {
        this.value = Units[matchedUnits[0]].transform(value, unit);
    } else {
        this.value = value.text;
    }
};

module.exports = (technicalParameter) =>
    new TechnicalParameter(
        technicalParameter.name,
        technicalParameter.unit,
        technicalParameter.value
    );
