exports.get404 = (req, res, next) => {
  res.render('404', { path: '404', pageTitle: 'Page Not Found' });
}