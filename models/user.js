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
    if (this.cart === null) {
      this.cart = { items: [] };
    }

    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity
      });
    }

    const updatedCart = {
      items: updatedCartItems
    };

    const db = getDb();

    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: this._id },
        { $set: { cart: { items: updatedCartItems } } }
      )
      .then(result => {
        return;
      })
      .catch(err => console.log(err));
  }

  getCart() {
    const db = getDb();

    const productIds = this.cart.items.map(i => {
      return i.productId;
    });

    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).quantity
          };
        });
      })
      .catch(err => console.log(err));
  }

  addOrder() {
    const db = getDb();

    return db
      .collection('orders')
      .insertOne({ ...this.cart, userId: this._id })
      .then(() => {
        this.cart = { items: [] };
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();

    return db
      .collection('orders')
      .find({ userId: this._id })
      .toArray()
      .then(orders => {
        return orders.map(order => {

          const productIds = order.items.map(item => {
            return item.productId;
          });

          return db
            .collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
              return {
                id: order._id,
                items: products
              };
            });
        });
      })
      .then(ordersPopulated => {
        return Promise.all(ordersPopulated);
      })
      .catch(err => console.log(err));
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
