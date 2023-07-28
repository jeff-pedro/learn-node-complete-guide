const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
}

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;

  const product = new Product(title, price, imageUrl, description);

  product
    .save()
    .then(result => {
      console.log('Created Product');
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.id;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateImageUrl = req.body.imageUrl;
  const updateDescription = req.body.description;

  const product = new Product(
    updateTitle,
    updatePrice,
    updateImageUrl,
    updateDescription,
    prodId
  )

  product
    .save()
    .then(() => {
      console.log('Updated Product');
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'Admin Products',
        path: '/admin/products',
        products: products
      });
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.delete(prodId)
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
}
