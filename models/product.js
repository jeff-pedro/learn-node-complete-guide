const fs = require('fs');
const path = require('path');

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
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductFromFile((products) => {
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    return getProductFromFile(cb);
  }

  // -- I do this.

  static update(id, data) {
    getProductFromFile((products) => {
      const productIndex = products.findIndex((product) => product.id === Number(id));
      products.pop(productIndex);
      products.push({ id: Number(id), ...data });

      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log(err);
      });
    });
  }

  static fetchById(id, cb) {
    getProductFromFile((products) => {
      cb(products.find((item) => item.id === Number(id)));
    });
  }
}