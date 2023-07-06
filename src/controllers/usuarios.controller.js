import Usuario from '../models/usuario.model';

export const addUsuario = async (req, res) => {
	let { nombre, rut, email, password } = req.body;
	try {
		// Se crea un nuevo usuario, pero al hacerlo no devolverá la contraseña
		let nuevoUsuario = await Usuario.create({ nombre, rut, email, password });

		res.status(201).json({
			code: 201,
			data: nuevoUsuario,
			message: `Usuario ${nuevoUsuario.nombre} creado con ID: ${nuevoUsuario.id}}`,
		});
	} catch (error) {
		res
			.status(500)
			.json({ code: 500, message: 'Error al crear nuevo usuario' });
	}
};
