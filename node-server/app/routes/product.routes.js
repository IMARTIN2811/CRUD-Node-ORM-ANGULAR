module.exports = app => {
    const products = require("../controllers/product.controller.js");
    var router = require("express").Router();

    //crea un nuevo producto
    router.post("/", products.create);
    //Recupera todos los productos
    router.get("/", products.findAll);
    //Recupera un producto mediante el id
    router.get("/:id", products.findOne);
    //Actualiza un producto por el id
    router.put("/:id", products.update);
    //Elimina el prodcuto con el id
    router.delete("/:id", products.delete);
    //Elimina todos los productos
    router.delete("/", products.deleteAll);

    app.use('/api/products', router);

};