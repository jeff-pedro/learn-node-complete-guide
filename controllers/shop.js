const Product = require('../models/product');
const Cart = require('../models/cart');

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
  Product.findById(productId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Details',
      path: '/products',
    })
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      products: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
}

exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {
    Cart.getCart((cart) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      });
    });
  });

}

exports.postCart = (req, res, next) => {
  const productId = req.body.id;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart');
}
// I did
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' })
}
