const { Database, aql } = require("arangojs");

const arango = new Database({
    url: process.env.ARANGO_URL,
    databaseName: process.env.ARANGO_DATABASE,
    auth: { username: process.env.ARANGO_USER, password: process.env.ARANGO_PASSWORD },
});

module.exports = arango;
