import { Router } from 'express';
import {
	findAllProductos,
	addProductos,
} from '../controllers/productosCloud.controller.js';
import { uploadFiles as upload } from '../middlewares/uploadCloud.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import Usuario from '../models/usuario.model.js';
const router = Router();

router.get('/', findAllProductos);
// Se pasa primero el middleware, antes de la funcion del controlador
// Se protegerá esta ruta con otro middleware
const validarAdmin = async (req, res, next) => {
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

router.post('/', verifyToken, validarAdmin, upload, addProductos);
export default router;
