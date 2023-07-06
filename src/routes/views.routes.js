import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import Usuario from '../models/usuario.model.js';

const router = Router();

// Proteger ruta perfil
router.get('/home', (req, res) => {
	res.send('VISTA HOME');
});
router.get('/perfil', verifyToken, async (req, res) => {
	let usuarioToken = req.usuario;
	let usuario = await Usuario.findByPk(usuarioToken.id);
	if (!usuario) {
		return res.send('<h1>Usuario ya no existe, verifique su cuenta</h1>');
	}
	res.send(`<h1>Bienvenido usuario: ${usuario.nombre}</h1>`);
});

export default router;
