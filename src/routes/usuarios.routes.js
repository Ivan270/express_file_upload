import { Router } from 'express';
import { addUsuario, login } from '../controllers/usuarios.controller.js';
import { emitToken } from '../middlewares/auth.middleware.js';

const router = Router();

// ruta post usuarios
router.post('/', addUsuario);
router.post('/login', emitToken, login);
export default router;
