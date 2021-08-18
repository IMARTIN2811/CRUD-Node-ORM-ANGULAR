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
        attributes: ['id','username','email','password','createdAt']
        
    }).then(user =>{
        res.send(user)
    })
    .catch(err=>{
        console.log('Error al visualizar los datos')
    })
}
