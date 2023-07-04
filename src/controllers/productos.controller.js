export const findAllProductos = async (req, res) => {
	res.send('Ruta findAll productos');
};
export const addProductos = async (req, res) => {
	res.status(201).send({ code: 201, message: 'Ruta post Productos' });
};
