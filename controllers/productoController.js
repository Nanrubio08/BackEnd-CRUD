const modelProducto = require('../models/modelProducto');

//Crear Producto
exports.crearProducto = async(req, res) =>{
    try {
        let nuevoProducto = new modelProducto(req.body);
        await nuevoProducto.save();
        res.status(201).json({ message: 'Producto creado', producto: nuevoProducto });
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Error al crear Producto'});
    }
} 

//Obtener Productos
exports.obtenerProducto = async(req, res) =>{
    try {
        const dataProducto = await modelProducto.find();
        res.json(dataProducto);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Error al consultar Productos'});
    }
}

//Obtener Productos por Categoria
exports.obtenerProductoPorCat = async(req, res) =>{
    try {
        const dataProducto = await modelProducto.find({categoria: req.params.categoria});
        if(!dataProducto||dataProducto.length===0){
            return res.status(404).json({message: 'No hay Productos con esa Categoria'});
        }
        res.json(dataProducto);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Error al consultar Productos'});
    }
}

//Actualizar Productos
exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    let camposActualizados = { ...req.body };   
    if ('stock' in camposActualizados) {
      if (camposActualizados.stock <= 0) {
        camposActualizados.disponible = false;
      } else {
        camposActualizados.disponible = true;
      }
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