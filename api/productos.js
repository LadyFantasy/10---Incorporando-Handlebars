const arrProds = require("./productos.json");

class Productos {
  constructor() {
    this.arrproductos = arrProds;
  }

  listar() {
    return this.arrproductos;
  }

  listarId(id) {
    const product = this.arrproductos.find(prod => {
      return prod.id == id;
    });
    return product;
  }

  guardar(body) {
    if (body.title && body.price && body.thumbnail) {
      let { title, price, thumbnail } = body;
      price = Number(price);
      const id = this.arrproductos.length + 1;
      const product = { title, price, thumbnail, id };

      this.arrproductos.push(product);

      return product;
    } else return;
  }

  actualizar(id, body) {
    const { title, price, thumbnail } = body;
    id = Number(id);
    const newProduct = { title, price, thumbnail, id };

    let correctId = this.listarId(id);

    if (correctId) {
      let producto = this.arrproductos.findIndex(product => product.id == id);
      this.arrproductos[producto] = newProduct;
      return newProduct;
    } else return;
  }

  borrar(id) {
    let correctId = this.listarId(id);

    if (correctId) {
      this.arrproductos = this.arrproductos.filter(product => product.id != id);
      return correctId;
    } else return;
  }
}

module.exports = Productos;
