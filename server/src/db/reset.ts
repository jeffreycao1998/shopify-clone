require('dotenv').config();
const fs = require('fs');
const chalk = require('chalk');
const { Client } = require('pg');

// PG connection setup
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync(`${__dirname}/schema`);

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`${__dirname}/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await client.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const schemaFilenames = fs.readdirSync(`${__dirname}/seeds`);

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`${__dirname}/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await client.query(sql);
  }
};

const resetDb = async () => {
  try {
    client.connect();
    await runSchemaFiles();
    await runSeedFiles();
    client.end();
  } catch(err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    client.end();
  }
};
resetDb();