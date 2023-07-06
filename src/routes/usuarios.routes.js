import { Router } from 'express';
import { addUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

// ruta post usuarios
router.post('/', addUsuario);
export default router;
