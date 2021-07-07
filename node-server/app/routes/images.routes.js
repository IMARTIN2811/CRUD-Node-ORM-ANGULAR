//const controller = require("../controllers/upload.controller");
const Image = require("../controllers/img.controller");
//const upload = require("../middleware/upload.middl");
const express = require("express");
const router = express.Router();

module.exports = function(app) {
    //se define la ruta y la configuracion del acceso cors
    app.use(function(req,res, next) {
        res.setHeader("Access-Control-Allow-Origin","*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

   router.route('/images').post(Image.addImages);
   router.route('/images/:id').post(Image.addImages);
   router.route('/images/all').get(Image.getImages);
   router.route('/images').patch(Image.updateImages);
   router.route('/images/delete/:id').delete(Image.deleteImages);
   app.use('/api', router);
   
};