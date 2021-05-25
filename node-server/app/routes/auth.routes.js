//Se hacen las impprtaciones
const { verificaSignup } = require("../middleware");
const controller = require("../controllers/authent.controller");
//

//se crea la funcion y se exporta
module.exports =  function(app){
    //se define la ruta y la configuracion del acceso cors
    app.use(function(req,res, next) {
        res.header("Access-Control-Allow-Headers",
                    //  "x-access-token, Origin, Content-Type: application/json, Accept"
                    "x-access-token, Origin, Content-Type, Accept"
                );
        next();
    });

    //se configura la ruta para el registro de user
    app.post("/api/auth/register", 
        [verificaSignup.checkDuplicateUserEmail,
         verificaSignup.checkRoleExisted], 
        controller.register
    );

    //Ruta para el login
    app.post("/api/auth/login", controller.login);
};
