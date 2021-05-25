//se hacen las importaciones 
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user; 
//

//verifica el token
verifyToken = (req, res, next) =>{
    let token = req.headers["x-access-token"];

    //si el token no existe mandara un mensaje
    if (!token) {
        return res.status(403).send({
            message: "No se ha proporcionado ningún token"
        });
    }

    //verifica si el token corresponde al rol
    jwt.verify( token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "No autorizado"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

//funcion para rol administrador
RolAdmin = (req,res, next) => {
    //busca el usuario por id
    User.findByPk(req.userId).then(user => {
        //busca el rol del usuario
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            //si el usuario corresponde a un rol diferente mandara un mensaje este mensaje
            res.status(403).send({
                message: "Requiere rol de administrador"
            });
            return;
        });
    });
};

//Funcion para rol empleados
RolEmployee = (req, res, next)=> {
    //busca el rol de empleado
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "employee") {
                    next();
                    return;
                }
            }
            //si el usuario corresponde a un rol diferente mandara un mensaje este mensaje
            res.status(403).send({
                message: "Requiere el rol de empleado"
            });
        });
    });
}; 

//Funcion para rol Administrador o empleado
RolEmpOrAdmin = (req,res, next)=>{
    //busca el rol
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                //si el corresponde al empleado
                if (roles[i].name === "employee") {
                    next();
                    return;
                }
                //si el rol corresponde el admin
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            
            //si el usuario corresponde a un rol diferente mandara un mensaje este mensaje
            res.status(403).send({
                message: "Requiere el rol Empleado o Administrador"
            });
        });
    });
};

// se declara un objeto e incluye las funciones
const AuthJwt = {
    verifyToken: verifyToken,
    RolAdmin: RolAdmin,
    RolEmployee: RolEmployee,
    RolEmpOrAdmin: RolEmpOrAdmin  
};

//se llama el objeto y los exporta
module.exports = AuthJwt;