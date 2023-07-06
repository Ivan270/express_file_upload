import app from './src/app.js';
// import 'dotenv/config';
import sequelize from './src/database/database.js';

// Modelos
import './src/models/producto.model.js';
import './src/models/usuario.model.js';

const PORT = process.env.PORT || 3000;

const main = async () => {
	try {
		await sequelize.authenticate();
		console.log('Conectado con éxito a la base de datos');
		await sequelize.sync({ force: true, alter: true });
		app.listen(PORT, () => {
			console.log('Servidor escuchando en http://localhost:' + PORT);
		});
	} catch (error) {
		console.log('Ha ocurrido un error', error);
	}
};

main();
