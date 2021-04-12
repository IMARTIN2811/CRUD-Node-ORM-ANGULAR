//Importing the model 
const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

//create and save a new product
exports.create =( req,res) => {
    //valida la solicitud
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"  
        });
        return;
    }

    //crea el producto
    const producto = {
        name: req.body.name,
        price: req.body.price
    };

    //Guarda el producto a la base de datos
    Product.create(producto)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                err.message || "Se produjo un errro al crear el producto"
            });
        });
};

//recupera todo los productos de la base de datos
exports.findAll = (req,res) =>{
   const name = req.query.name;
   var condicion = name ? { name: { [Op.like]: `%${name}%` }}: null;

   Product.findAll({ where: condicion })
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "Se produjo un error al recuperar los productos"
        });
    });
};

//busca el producto solo con el id
exports.findOne = (req,res) =>{
    const id = req.params.id;

    Product.findByPk(id)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el producto con id=" + id
            });
        });
};

//actualiza el producto con el id
exports.update = (req,res) => {
    const id = req.params.id;

    Product.update(req.body, {
        where : { id : id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message : "El prducto se ha actualizado correctamente"
            });
        } else {
            res.send({
                message: `No se pudo actualizar el producto con id=${id}. No se encontró el producto` 
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Error al actualizar el producto con id=" + id
        });
    });
};

//Elimina el producto  especificando el id
exports.delete = (req,res)=> {
    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "El prodcuto se ha eliminado correctamente!"
            });
        } else {
            res.send({
                message: `No se pudo eliminar el producto con id=${id}. Quizas no se encontró el tutorial!`
            });
        }
    })
    .catch( err => {
        res.status(500).send({
            message: "No se pudo eliminar el producto con id=" + id
        });
    });
};

//elimina todos los productos de la base de datos
exports.deleteAll = (req,res) => {
    Product.destroy({
        where: {},
        truncate: false       
    })
    .then( nums => {
        res.send({ message: `${ nums } Los productos se eliminaron correctamente` });
    })
    .catch (err => {
        res.status(500).send({
            message:
            err.message || "Se produjo un error al eliminar todos los productos"
        });
    });
};

