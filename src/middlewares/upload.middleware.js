import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Intermediario con rutas. Para validar formatos de archivos, etc.
const uploadFiles = (req, res, next) => {
	let foto = req.files.imagen;
	let formatosPermitidos = ['jpeg', 'png', 'webp', 'gif', 'svg'];
	let extension = `${foto.mimetype.split('/')[1]}`;
	if (!formatosPermitidos.includes(extension)) {
		return res.status(400).json({
			code: 400,
			message: `Formato no permitido ${extension}, formatos permitidos(${formatosPermitidos.join(
				' - '
			)})`,
		});
	}
	let nombreFoto = `${Date.now()}-img.${extension}`;
	let pathDestino = path.join(__dirname, '/../../public/uploads', nombreFoto);

	foto.mv(pathDestino, async (error) => {
		if (error)
			return res
				.status(500)
				.json({ code: 500, message: 'Error al subir la imagen.' });
		req.nombreImagen = nombreFoto;
		req.pathImagen = pathDestino;
		next();
	});
};

export default uploadFiles;
