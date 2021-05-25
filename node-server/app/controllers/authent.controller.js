//se hacen las importaciones
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
//const { role } = require('../models');
//

//exporta el objeto signup
exports.register = (req,res) => {
    //guarda el usuarioa bd
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then( user =>{
        //verifica el rol 
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name:{
                        [Op.or]: req.body.roles
                    }
                }
            //Despues verificar el rol se guardan los datos
            }).then(roles =>{
                user.setRoles(roles).then(()=>{
                    res.send({ message: "Datos registrados exitosamente" });
                });
            });
        } else {
            user.setRoles([1]).then(()=> {
                res.send({ message: "Datos registrados exitosamente" });
            });
        }
        //Si no guarda los dayos mandara un mensaje de error
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

//para el inicio de sesion
exports.login = (req,res) =>{
    // busca si el usuario existe
    User.findOne({
        where: {
            username: req.body.username
        }
    //si el usuario es diferente mandara un mensaje
    }).then(user =>{
        if (!user) {
            return res.status(404).send({ message: '¡Usuario no encontrado!' });
        }

        //encripta el password del user
        var PswIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        //verifica si el password es correcto
        if (!PswIsValid) {
            return res.status(401).send({ 
                accessToken: null,
                message: '¡Contraseña incorrecta!' 
            });
        }

        //se genera el token y el tiempo de expiracion
        var token = jwt.sign({ id: user.id }, config.secret, {
            //Especifica el tiempo de expiracion,86400 equivale a 24 hrs 
            expiresIn: 86400 
        });

        //Se Especifica el rol del usuario y accede a sus datos 
        var author = [];
        //accede al rol del user
        user.getRoles().then(roles =>{
            //repite el rol para varios usuarios
            for (let i = 0; i < roles.length; i++) {
                //accede al rol y al nombre del usuario
                author.push("ROLE_" + roles[i].name.toUpperCase());
            }   
            //se envian los datos del usuario 
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: author,
                accessToken: token
            });
        });
        //si hay algun error mandara un mensaje
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};