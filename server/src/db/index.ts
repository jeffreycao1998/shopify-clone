require('dotenv').config();
import { Sequelize } from 'sequelize';

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const pass = process.env.DB_PASS
const port = Number(process.env.DB_PORT);

const sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${database}`);

export default sequelize;