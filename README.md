# Learning Node.js: The Complete Guide Course
> This repository is used to learn and explore the Node.js world. Here, I'm building an "Online Shop" while enjoying node.js features.

<<<<<<< HEAD
## Contents
- [Dynamic Data Templates](docs/5-dynamic-data-templates)
- [Model, View, Controller](docs/6-model-view-controller)
- [Dynamic Routes and Advanced Models](docs/8-dynamic-routes-and-advanced-models)
- [SQL Introduction](docs/9-sql-introduction)
- [Understanding Sequelize](docs/10-understanding-sequelize)
- [Working with NoSQL and MongoDB](docs/11-working-with-nosql-and-mongodb)
=======
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


# 10. Understanding Sequelize

### Resources
* [Sequelize Official Docs](https://sequelize.org/)

### Explored
* [Setup](https://sequelize.org/docs/v6/getting-started/) sequelize.
* [Define models and sync](https://sequelize.org/docs/v6/core-concepts/model-basics/#using-sequelizedefine) javascript definitions to the database.
* Fetch, save, update and delete data from the database.
* Manipulate data with sequelize methods to [create](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-insert-queries), [find](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/), [update](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries) and [delete](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-delete-queries).
* Work with [associations:](https://sequelize.org/docs/v6/core-concepts/assocs/) 
    * how to communicate or relate different models 
    * how to connect tables to find how they work together
    * how to create associations like many-to-many, one-to-many, one-to-one
    * work with magic methods available through assossiations
        * allow us to connect data, add data and delete data...

### Features
* Implement a User model with and a dummy user
* Add, edit and delete a product
* Show all added products
* View product details
* Add products to cart
* Create orders with cart-related products
* Store all data to a SQL database


# 11. NoSQL

### Resources
* [MongoDB Official Docs](https://docs.mongodb.com/manual/core/security-encryption-at-rest/https://docs.mongodb.com/manual/)
* [SQL vs NoSQL](https://academind.com/learn/web-dev/sql-vs-nosql/)

### Explored
* Setup MongoDB driver
* CRUD operations
* How to use relational and embedded data

### Features
* All old functionalities changed to support MongoDB
* Remove the non existent products into the user cart
>>>>>>> 11-nosql
