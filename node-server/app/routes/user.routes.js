//se hacen ñas importaciones 
const { AuthJwt } = require('../middleware');
const controller =  require('../controllers/user.controller');
//

//se crea la funcion y se exporta
module.exports = function (app) {
    //se configura el encabezado de respuesta http
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers",
                   "x-access-token", "Origin", 
                   "Content-Type: application/json", "Accept"
                );
            next();
    });

    //configura la ruta que le da acceso a todo al usuario 
    app.get("/api/test/all", controller.AllAccess);
    
    //configura la ruta que solo da acceso al usuario
    app.get("/api/test/user",[AuthJwt.verifyToken], controller.User);

    //configura la ruta que solo da acceso al empleado
    app.get("/api/test/emp",[AuthJwt.verifyToken,AuthJwt.RolEmployee], controller.Employ);

    //configura la ruta que solo da acceso al administradpr
    app.get("/api/test/admin",[AuthJwt.verifyToken,AuthJwt.RolAdmin], controller.Admin);
};

