//se hacen las importaciones
const db = require("../models");
const User = db.user;

exports.user = (req,res)=>{
    User.findAll({
        /*
        include:{
            model: roles,
            attributes: ['id','name'],   
        },
         */
        //Especifica que campos del modelo a mostrar
        attributes: ['id','username','email','createdAt']
        
    }).then(user =>{
        res.send(user)
    })
    .catch(err=>{
        console.log('Error al visualizar los datos')
    })
}

module.exports.deleteUsers = (req,res)=>{
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
    .then(num =>{
        if (num == 1) {
            res.send({ message: 'El usuario se ha eliminado correctamente' })
        }
        else{
            res.send({ message: `No se pudo eliminar el usuario con id=${id}`});
        }
    })
    .catch(err =>{
        res.status(500).send({ message: 'Error al eliminar el usuario'+ id });
    });
}
