const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description
    })
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

  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId)
    .then(products => {
      const product = products[0];
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
  const updateImageUrl = req.body.imageUrl;
  const updatePrice = req.body.price;
  const updateDescription = req.body.description;

  // Product.findByPk(prodId)
  //   .then(product => {
  //     product.title = updateTitle;
  //     product.price = updatePrice;
  //     product.description = updateDescription;
  //     product.imageUrl = updateImageUrl;
  //     return product.save();
  //   })
  //   .then(result => {
  //     console.log('UPDATE PRODUCT');
  //     res.redirect('/admin/products');
  //   })
  //   .catch(err => console.log(err))

  Product.update({
    title: updateTitle,
    imageUrl: updateImageUrl,
    price: updatePrice,
    description: updateDescription
  }, {
    where: {
      id: prodId
    }
  })
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
      res.render('admin/products', {
        path: '/admin/products',
        products: products
      });
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

  // Product.destroy({ where: { id: prodId } })
  //   .then(() => res.redirect('/admin/products'))
  //   .catch(err => console.log(err));
}
