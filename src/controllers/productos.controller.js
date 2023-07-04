import Producto from '../models/producto.model.js';
import fs from 'fs';

export const findAllProductos = (req, res) => {
	res.send('Ruta findAll Productos.');
};
export const addProductos = async (req, res) => {
	//console.log(req.body);
	let { nombre, descripcion, precio } = req.body;
	//console.log(req.files);
	// req.nombreImagen = nombreFoto; -> viene desde middleware
	// req.pathImagen = pathDestino; -> viene desde middleware

	try {
		let nuevoProducto = {
			nombre,
			descripcion,
			precio: Number(precio),
			imagen: req.nombreImagen,
		};
		let productoCreado = await Producto.create(nuevoProducto);
		res.status(201).json({
			code: 201,
			message: 'Producto se cargó con éxito',
			data: productoCreado,
		});
	} catch (error) {
		// Para borrar la imagen en caso de error.
		// Asi se evita llenar la carpeta de imagenes de peticiones erroneas
		console.log(error);
		fs.unlinkSync(req.pathImagen);
		res.status(500).send({
			code: 500,
			message: 'Error al crear el producto en la base de datos',
		});
	}
};
