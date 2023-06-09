# 5. Dynamic Data Templates

### Resources
* [Pug Docs](https://pugjs.org/api/getting-started.html)
* [Handlebars Docs](https://handlebarsjs.com/)
* [Express Handlebars Docs](https://www.npmjs.com/package/express-handlebars)
* [EJS Docs](https://ejs.co/#docs)
* [Express EJS Docs](https://github.com/mde/ejs/wiki/Using-EJS-with-Express)


# 6. Model, View, Controller

### Resources
* [More on MVC](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Modern_web_app_architecture/MVC_architecture)


# 8. Dynamic Routes and Advanced Models

### Resources
* [Express Routing Docs](https://expressjs.com/en/guide/routing.html)

### Explored
* How to pass _dynamic path segments_ to the Express route path. (`path`**`:<param>`)**
* Extract this data via _request parameters_. (`req.params`)
* Gather parameters passed to URL (http://path/**`?param1=value1&param2=value2`**)
* and use it through Express query parameters (`req.query.`**`<params>`**)
* Work with files for data storage.

### Features
* Added Cart model that holds static methods.
* Implemented delete cart feature, for this was created interection between models.
* Stored more data in files (_products in the cart_).
* Create view to Cart.


# 9. SQL Introduction

### Resources
* [To Learn about MySQL](https://www.w3schools.com/sql/)
* [To Learn about Node MySQL Package](https://github.com/sidorares/node-mysql2)
* [Installing MySQL Server](https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing)
* [SQL vs NoSQL](https://academind.com/tutorials/sql-vs-nosql)
* [MySQL NPM Docs](https://www.npmjs.com/package/mysql2)

### Explored
* Create and configure mysql connections pool.
* Execute queries to create and retrieve data.
