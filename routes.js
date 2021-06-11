const express = require("express");
const router = express.Router();

// CONTROLLER
const Productos = require("./api/productos");
const instanceProductos = new Productos();

// RUTAS
router.get("/productos/vista", (req, res) => {
  const productos = instanceProductos.listar();
  if(productos.length > 0) {
    res.render("vista", { hayProductos: productos });
  }
  else {
    res.json({ error: "No hay productos cargados" })
  }
  
});

router.get("/productos/listar", (req, res) => {
  const productos = instanceProductos.listar();
  res.json(productos.length > 0 ? productos : { error: "No hay productos cargados" });
});

router.get("/productos/listar/:id", (req, res) => {
  const id = req.params.id;
  const product = instanceProductos.listarId(id);
  res.send(product ?? { error: "Producto no encontrado" });
});

router.post("/productos/guardar", (req, res) => {
  const body = req.body;
  const product = instanceProductos.guardar(body);
  // res.send(product ?? { error: "Falta rellenar campos" });
  res.redirect("/");
});

router.put("/productos/actualizar/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const product = instanceProductos.actualizar(id, body);
  res.send(product ?? { error: "producto no encontrado" });
});

router.delete("/productos/borrar/:id", (req, res) => {
  const id = req.params.id;
  const product = instanceProductos.borrar(id);
  res.send(product ?? { error: "producto no encontrado" });
});

module.exports = router;
