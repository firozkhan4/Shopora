// models/index.js
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import process from 'process';
import configFile from '../config/config.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load all model files
const files = await readdir(__dirname);

for (const file of files) {
  if (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.endsWith('.js') &&
    !file.endsWith('.test.js')
  ) {
    const modelModule = await import(path.resolve(__dirname, file));
    const model = modelModule.default(sequelize, DataTypes);
    db[model.name] = model;
    console.log(`Loaded model: ${model.name}`);
  }
}

// Setup model associations
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;
