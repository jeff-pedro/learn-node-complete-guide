const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      products: products,
      path: '/admin/products',
      pageTitle: 'Admin Products'
    });
  });
}

exports.getEditProduct = (req, res, next) => {
  const { id } = req.params;
  Product.fetchById(id, (product) => {
    console.log(product);
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '',
      product: product
    });
  });
}

exports.updateProduct = (req, res, next) => {
  const { id } = req.params;
  const newData = req.body;
  console.log(newData);
  Product.update(id, newData);
  res.redirect('/admin/products');
}