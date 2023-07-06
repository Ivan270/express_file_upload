import Sequelize from 'sequelize';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import pg from 'pg';

import { config } from 'dotenv';
let database, username, password, host;
let dialectOptions = null;

// Evalua el tipo de Entorno (desarrollo o produccion, se pasa en script npm)
if (process.env.NODE_ENV.includes('production')) {
	// Si es que el nombre del tipo de entorno es production
	// se cargan las variables de entorno .env.production para conectarse
	// al servidor en la nube
	let rutaEnv = path.join(__dirname, '/../../.env.production');
	config({ path: rutaEnv });
	// Opciones requeridas por render
	dialectOptions = {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	};
} else {
	// Si es que el nombre del tipo de entorno es development
	// se cargan las variables de entorno .env para conectarse
	// a la BD local
	let rutaEnv = path.join(__dirname, '/../../.env');
	config({ path: rutaEnv });
}

database = process.env.DB_DATABASE;
username = process.env.DB_USER;
password = process.env.DB_PASSWORD;
host = process.env.DB_HOST;

const sequelize = new Sequelize(database, username, password, {
	host: host,
	port: process.env.DB_PORT || 5432,
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 20000,
		idle: 5000,
	},
	dialectOptions,
	dialectModule: pg,
});

export default sequelize;
