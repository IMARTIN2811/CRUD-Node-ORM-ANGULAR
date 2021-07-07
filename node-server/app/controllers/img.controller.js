const db = require('../models/index');
const Images = db.img;
const fs = require('fs');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage }).single('image');

module.exports.getImages = function(req,res,next) {
    Images.findAll({})
        .then(image => {
            res.json({ success: true, data: image })
        })
        .catch(err =>{
            console.log('Ocurrio un error:: /api/getImages')
        })    
}

module.exports.addImages = function (req,res,next){
    var id = req.params.id
    if (id !== undefined) {
        upload(req,res, (err) => {
            if (err) {
                console.log('errors', err);
            } else {
                var imageData = fs.readFileSync(req.file.path);
                Images.update(
                    { image: imageData },
                    { where : { image_id: id }}
                )
                .then(result => {
                    console.log(result);
                    res.json({status: 200});
                })
                .catch(err =>{
                    console.log(err);
                })
            }
        });
    } else {
        upload(req, res, (err) => {
            if (err) {
                console.log('errors', err);
            } else{
                var imagenData = fs.readFileSync(req.file.path);
                var images = Images.build({
                    description: req.body.description,
                    image: imagenData
                });
                images.save()
                    .then(function (result){
                        console.log(result);
                        res.json({status:200});
                    });
            }
        });
    }
}

module.exports.updateImages = function(req,res,next) {
    const { id,description } = req.body;
    console.log(req.body);
    Images.update(
        { description: description },
        { where: { image_id: id } }
    )
        .then(result =>{
            console.log(result);
            res.json({ status: 200 });
        })
        .catch(err =>{
            console.log(err);
        })
}

module.exports.deleteImages = (req,res)=> { 
    const id = req.params.id;
    
    Images.destroy({
        where: { image_id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: 'La imagen se ha eliminado correctamente' });
        }
        else{
            res.send({ mesage: `No se pudo eliminar la imagen con id=${id}`});
        }
    })
    .catch(err =>{
        res.status(500).send({ message: 'Error al eliminar la imagen' + id });
    });
    /*
    var imageData = fs.readFileSync(req.file.path);
    fs.unlink('images/uploads/', )
        .then(() =>{
          console.log('Se ha eliminado correctamente')  
        }).catch(err=>{
            console.error('Error al eliminar la imagen')
        })
    */
}
