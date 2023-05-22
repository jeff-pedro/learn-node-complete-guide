exports.get404 = (req, res, next) => {
  res.render('404', { path: '', pageTitle: 'Page Not Found' });
}