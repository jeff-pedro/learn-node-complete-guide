const Product = require('../models/product');
const User = require('../models/user');
// const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/products-list', {
        products: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        products: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(products => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: products
      });
    })
    .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.id;

  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(() => {
      return res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .removeFromCart(prodId)
    .then(() => {
      console.log(`Product id:${prodId} was removed!`);
      res.redirect('/cart');
    })
    .catch(err => console.log(err));


  // req.user
  //   .getCart()
  //   .then(cart => {
  //     return cart.getProducts({ where: { id: prodId } })
  //   })
  //   .then(products => {
  //     let product = products[0];
  //     return product.cartItem.destroy();
  //   })
  //   .then(() => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {
  let fetchedCart;

  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            }));
        })
        .catch(err => console.log(err));
    })
    .then(() => {
      // fetchedCart.destroy();
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders/');
    })
    .catch(err => console.log(err));
}