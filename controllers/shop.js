const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  const productId = req.params.productId;

  // Product.findAll({ where: { id: productId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products',
  //     });
  //   })
  //   .catch(err => console.log(err));

  Product.findByPk(productId)
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
  Product.findAll()
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
  Product.fetchAll((products) => {
    Cart.getCart((cart) => {
      const cartProducts = [];
      for (let product of products) {

        if (cart !== null) {
          const cartProductData = cart.products.find(prod => prod.id === product.id)

          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
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
