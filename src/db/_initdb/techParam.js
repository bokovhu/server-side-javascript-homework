const T = 1000 * 1000 * 1000 * 1000;
const G = 1000 * 1000 * 1000;
const M = 1000 * 1000;
const K = 1000;

function GHz(name, ghz) {
    return { name: name, unit: "herz.G", value: { herz: ghz * G } };
}

function MHz(name, mhz) {
    return { name: name, unit: "herz.M", value: { herz: mhz * M } };
}

function TB(name, tb) {
    return { name: name, unit: "bytes.T", value: { bytes: tb * T } };
}

function GB(name, gb) {
    return { name: name, unit: "bytes.G", value: { bytes: gb * G } };
}

function MB(name, mb) {
    return { name: name, unit: "bytes.M", value: { bytes: mb * M } };
}

function KB(name, kb) {
    return { name: name, unit: "bytes.K", value: { bytes: kb * K } };
}

function Watts(name, w) {
    return { name: name, unit: "watts", value: { watts: w } };
}

function has(name, v) {
    return { name: name, unit: "has", value: { has: v } };
}

function bits(name, b) {
    return { name: name, unit: "bits", value: { bits: b } };
}

function count(name, c) {
    return { name: name, unit: "count", value: { count: c } };
}

function text(name, t) {
    return { name: name, unit: "text", value: { text: t } };
}

function Mbps(name, mbps) {
    return { name: name, unit: "bps.M", value: { bps: mbps * M } };
}

function Gbps(name, gbps) {
    return { name: name, unit: "bps.G", value: { bps: gbps * G } };
}

function MBps(name, MBps) {
    return { name: name, unit: "bps.MB", value: { bps: 8 * MBps * M } };
}

function GBps(name, GBps) {
    return { name: name, unit: "bps.GB", value: { bps: 8 * GBps * G } };
}

module.exports = {
    T: T,
    G: G,
    M: M,
    K: K,
    GHz: GHz,
    MHz: MHz,
    TB: TB,
    MB: MB,
    GB: GB,
    KB: KB,
    Watts: Watts,
    has: has,
    bits: bits,
    count: count,
    text: text,
    Mbps: Mbps,
    Gbps: Gbps,
    MBps: MBps,
    GBps: GBps,
};
