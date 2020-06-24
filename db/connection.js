require('dotenv').config();

const monk = require('monk');
const db = monk(process.env.ATLAS_URI);

module.exports = db;
