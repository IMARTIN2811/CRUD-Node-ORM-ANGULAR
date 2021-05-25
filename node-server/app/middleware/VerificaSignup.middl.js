//importa los archivos
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
//

//varifica si el usuario  y el eamil ya existe
checkDuplicateUserEmail = (req,res, next) =>{
    //verifica si el usuario ya existe
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: 'El usuario ya se encuentra en uso'
            });
            return;
        }

        //verifica el email si ya existe
        User.findOne({
            where: { 
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: '¡Error!, El email ya se encuentra en eso'
                });
                return;
            }
            next();
        });
    });
};

//verifica si existe el rol
checkRoleExisted = (req,res,next) =>{
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: '¡Error!, El rol no existe =' + req.body.roles[i] 
                });
                return;
            }
        }
    }
    next();
};

//llama las funciones y las ejecuta
const verificaSignup = {
    checkDuplicateUserEmail: checkDuplicateUserEmail,
    checkRoleExisted: checkRoleExisted
};

//exporta el modulo
module.exports = verificaSignup;