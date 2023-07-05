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