const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
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

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  
  if (!editMode) {
    return res.redirect('/');
  }
  
  const prodId = req.params.productId;
  
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      path: '/admin/products',
      products: products
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
