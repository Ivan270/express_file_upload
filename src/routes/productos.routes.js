import { Router } from 'express';
import {
	findAllProductos,
	addProductos,
} from '../controllers/productos.controller.js';
const router = Router();

router.get('/', findAllProductos);
router.post('/', addProductos);
export default router;
