const XLSX = require('xlsx');
const fs = require('fs');

// Cargar el archivo Excel
const workbook = XLSX.readFile('C:\\Users\\herna\\Desktop\\Programar\\BD_Proyecto.xlsx');
const hoja = workbook.Sheets[workbook.SheetNames[0]];

// Convertir a JSON
let productos = XLSX.utils.sheet_to_json(hoja);

// Normalizar campos
productos = productos.map(p => ({
  idProducto: Number(p.IdProducto),
  nombre: p.NombreProducto?.trim(),
  descripcion: p.Descripcion?.trim(),
  categoria: p.Categoría?.trim(),
  subcategoria: p.SubCategoria?.trim(),
  precio: Number(String(p['Precio Unidad']).replace(/[^0-9]/g, '')),
  stock: Number(p.Stock),
  imagen: p.ImagenNombre?.trim(),
  disponible: String(p.Disponible).toLowerCase() === 'true'
}));

// Guardar como JSON
fs.writeFileSync('./productos.json', JSON.stringify(productos, null, 2));
console.log('Archivo JSON generado correctamente');