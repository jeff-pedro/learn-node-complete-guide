const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/products-list', {
      products: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId);
  res.redirect('/');
}

exports.getIndex = (req, res, next) => {
  res.render('shop/index', { pageTitle: 'Shop', path: '/' });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', { pageTitle: 'Your Cart', path: '/cart' })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' })
}
