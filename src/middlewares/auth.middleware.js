import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';

export const emitToken = async (req, res, next) => {
	let { email, password } = req.body;
	let usuario = await Usuario.findOne({
		where: {
			email,
			password,
		},
		attributes: ['id', 'nombre', 'rut', 'email'],
	});
	if (!usuario) {
		res.status(400).send({ code: 400, message: 'Error de autenticación' });
	}
	console.log(usuario);
	// Recibe un objeto
	let token = jwt.sign(JSON.stringify(usuario), process.env.PASSWORD_SECRET);
	req.token = token;
	next();
};
