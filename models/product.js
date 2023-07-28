const { ObjectId } = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = new ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbOp;

    console.log(this._id);

    if (this._id) {
      // Update the product
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // Create the product
      dbOp = db
        .collection('products')
        .insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new ObjectId(prodId) })
      .next()
      .then(product => {
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static delete(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new ObjectId(prodId) })
      .then(result => {
        console.log(result);
        return;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports = Product;
