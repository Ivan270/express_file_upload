import express from 'express';
import upload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import productosRoutes from './routes/productos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Middlewares generales
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
// Para cuando datos no se mandan en json y si en la url por ejemplo
app.use(express.urlencoded({ extended: true }));
// Todas las imagenes subidas se guardaran en req.files y no req.body, req.query, req.params
app.use(upload());
// Public folder
app.use('/public', express.static(path.join(__dirname, '/../public')));

// Rutas
app.use('/api/v1/productos', productosRoutes);
app.use('/api/v1/usuarios', usuariosRoutes);

export default app;
