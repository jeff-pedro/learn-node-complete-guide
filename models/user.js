const { ObjectId } = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // { items: [] }
    this._id = id
  }

  save() {
    const db = getDb();

    return db
      .collection('users')
      .insertOne(this)
      .then(result => {
        console.log('Saved!', result);
      })
      .catch(err => console.log(err));
  }

  addToCart(product) {

    let cartProductIndex;
    let updatedCart;

    if (this.cart === null) {
      this.cart = { items: [] };
    }

    cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    
    if (cartProductIndex >= 0) {
      this.cart.items[cartProductIndex].quantity += 1;
      updatedCart = this.cart
    } else {
      this.cart.items.push({ productId: new ObjectId(product._id), quantity: 1 });
      updatedCart = this.cart
      console.log(updatedCart);
    }

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();

    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        return user;
      })
      .catch(err => console.log(err));
  }
}

module.exports = User;
