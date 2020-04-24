require("dotenv").config();
const mongoose = require("mongoose");

const host = process.env.MONGO_HOST || "localhost";
const port = process.env.MONGO_PORT || "27017";
const user = process.env.MONGO_USER || undefined;
const password = process.env.MONGO_PASSWORD || undefined;

const url = `mongodb://${host}:${port}/pcbuilder`;
console.info("Connecting to Mongo at URL ", url);

mongoose
    .connect(url, {
        user: user,
        pass: password,
        authSource: 'admin',
        useNewUrlParser: true,
    })
    .catch((err) => console.error(JSON.stringify(err)));

module.exports = mongoose;
