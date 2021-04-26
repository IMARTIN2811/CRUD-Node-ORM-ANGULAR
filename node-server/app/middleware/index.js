//se hacen las importaciones
const AuthJwt = require('./auth.middl');
const verificaSignup = require('./VerificaSignup.middl');
//const VerifSignup = require('../middleware/VerificaSignup.middl');
//

module.exports = {
    AuthJwt,
    verificaSignup
};
