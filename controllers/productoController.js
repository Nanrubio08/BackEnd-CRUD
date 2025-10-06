const modelProducto = require('../models/modelProducto');

const construirImagenUrl = (req, nombreArchivo) =>
  `${req.protocol}://${req.get('host')}/api/imagen/${nombreArchivo}`;

// Crear Producto
exports.crearProducto = async (req, res) => {
  try {
    let nuevoProducto = new modelProducto(req.body);
    await nuevoProducto.save();
    res.status(201).json({ message: 'Producto creado', producto: nuevoProducto });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error al crear Producto' });
  }
};

// Obtener todos los productos con imagenUrl
exports.obtenerProducto = async (req, res) => {
  try {
    const productos = await modelProducto.find();
    const productosConUrl = productos.map(p => ({
      ...p.toObject(),
      imagenUrl: construirImagenUrl(req, p.imagen)
    }));
    res.json(productosConUrl);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error al consultar Productos' });
  }
};

// Obtener productos por categoría con imagenUrl
exports.obtenerProductoPorCat = async (req, res) => {
  try {
    const productos = await modelProducto.find({ categoria: req.params.categoria });
    if (!productos || productos.length === 0) {
      return res.status(404).json({ message: 'No hay Productos con esa Categoría' });
    }
    const productosConUrl = productos.map(p => ({
      ...p.toObject(),
      imagenUrl: construirImagenUrl(req, p.imagen)
    }));
    res.json(productosConUrl);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error al consultar Productos por Categoría' });
  }
};

// Obtener productos por subcategoría con imagenUrl
exports.obtenerPorSubcategoria = async (req, res) => {
  try {
    const productos = await modelProducto.find({ subcategoria: req.params.subcategoria });
    if (!productos || productos.length === 0) {
      return res.status(404).json({ message: 'No hay Productos con esa Subcategoría' });
    }
    const productosConUrl = productos.map(p => ({
      ...p.toObject(),
      imagenUrl: construirImagenUrl(req, p.imagen)
    }));
    res.json(productosConUrl);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error al consultar Productos por Subcategoría' });
  }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    let camposActualizados = { ...req.body };

    if ('stock' in camposActualizados) {
      camposActualizados.disponible = camposActualizados.stock > 0;
    }

    const productoActualizado = await modelProducto.findByIdAndUpdate(
      id,
      camposActualizados,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(productoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al actualizar el producto',
      detalle: error.message
    });
  }
};