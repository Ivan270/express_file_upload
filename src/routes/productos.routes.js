import { Router } from 'express';
import {
	findAllProductos,
	addProductos,
} from '../controllers/productos.controller.js';
import upload from '../middlewares/upload.middleware.js';
const router = Router();

router.get('/', findAllProductos);
// Se pasa primero el middleware, antes de la funcion del controlador
router.post('/', upload, addProductos);
export default router;
