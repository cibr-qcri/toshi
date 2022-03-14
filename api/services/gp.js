const { Pool } = require('pg');

const gp = new Pool({
  user: process.env.GP_USER,
  host: process.env.GP_HOST,
  database: process.env.GP_DATABASE,
  password: process.env.GP_PASSWORD,
  port: process.env.GP_PORT,
});

gp.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log(`Error: ${err.message}`.red);
  } else {
    console.log(
      `Server connected to greenplum on ${process.env.GP_HOST}`.green
    );
  }
});

module.exports = gp;
