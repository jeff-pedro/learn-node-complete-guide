# 8. [Dynamic Routes and Advanced Models](https://github.com/jeff-pedro/learn-node-complete-guide/tree/08-dynamic-routes)

### Resources
* [Express Routing Docs](https://expressjs.com/en/guide/routing.html)

### Explored
* How to pass _dynamic path segments_ to the Express route path. (`path`**`:<param>`)**
* Extract this data via _request parameters_. (`req.params`)
* Gather parameters passed to URL (`http://path/`**`?param1=value1&param2=value2`**)
* and use it through Express query parameters (`req.query.`**`<params>`**)
* Work with files for data storage.

### Features
* Added Cart model that holds static methods.
* Implemented delete cart feature, for this was created interection between models.
* Stored more data in files (_products in the cart_).
* Create view to Cart.