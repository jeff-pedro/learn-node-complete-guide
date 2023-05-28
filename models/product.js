const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(product => product.id === this.id);
        const updateProduct = [...products];
        updateProduct[existingProductIndex] = this;

        fs.writeFile(p, JSON.stringify(updateProduct), (err) => {
          if (err) console.log(err);
        });
      } else {
        this.id = Math.round(Math.random() * 100).toString();
        products.push(this);

        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductFromFile((products) => {
      const product = products.find(prod => prod.id === id);
      const updateProduct = products.filter((product) => product.id !== id);
      fs.writeFile(p,JSON.stringify(updateProduct), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    return getProductFromFile(cb);
  }

  static findById(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
}
