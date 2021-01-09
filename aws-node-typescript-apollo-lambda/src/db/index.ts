import { Sequelize } from 'sequelize';

const user = 'postgres'
const host = 'localhost'
const database = 'shopify-clone'
const pass = 'postgres'
const port = 5432

const sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${database}`);

export default sequelize;