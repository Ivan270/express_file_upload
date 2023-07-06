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
		return res
			.status(400)
			.json({ code: 400, message: 'Error de autenticación' });
	}
	console.log(usuario);
	// Recibe un objeto
	let token = jwt.sign(JSON.stringify(usuario), process.env.PASSWORD_SECRET);
	req.token = token;
	next();
};
export const verifyToken = (req, res, next) => {
	try {
		let token = req.headers['authorization'];
		token = token.split(' ')[1];
		if (token.length == 0) {
			throw new Error('No se ha proporcionado un token');
		}
		jwt.verify(token, process.env.PASSWORD_SECRET, async (err, decoded) => {
			if (err) {
				// Code 401 === Unauthorized
				return res
					.status(401)
					.json({ code: 401, message: 'Debe proporcionar un token válido' });
			}
			let usuario = await Usuario.findByPk(decoded.id);
			if (!usuario) {
				return res
					.status(400)
					.json({ code: 400, message: 'Usuario ya no existe en el sistema' });
			}
			req.usuario = decoded;
			next();
		});
	} catch (error) {
		return res.status(401).json({ code: 401, message: error.message });
	}
};

export const validarAdmin = async (req, res, next) => {
	let usuarioToken = req.usuario;
	let usuario = await Usuario.findByPk(usuarioToken.id);
	// Verifica si usuario existe
	if (!usuario) {
		return res
			.status(400)
			.json({ code: 400, message: 'Usuario ya no existe en el sistema' });
	}
	// Verifica si usuario es Admin
	if (!usuario.admin) {
		return res.status(403).json({
			code: 403,
			message:
				'Usuario no cuenta con los permisos necesarios para crear un producto',
		});
	}
	next();
};
