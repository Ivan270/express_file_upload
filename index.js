import app from './src/app.js';

const PORT = process.env.PORT || 3000;

const main = () => {
	app.listen(PORT, () => {
		console.log('Servidor escuchando en http://localhost:' + PORT);
	});
};

main();
