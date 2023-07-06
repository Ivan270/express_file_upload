import { Router } from 'express';
import {
	findAllProductos,
	addProductos,
} from '../controllers/productosCloud.controller.js';
import { uploadFiles as upload } from '../middlewares/uploadCloud.middleware.js';
const router = Router();

router.get('/', findAllProductos);
// Se pasa primero el middleware, antes de la funcion del controlador
router.post('/', upload, addProductos);
export default router;
