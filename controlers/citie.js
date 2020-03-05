'use strict'

var Citie = require('../models/citie');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'soy la home'
        });

    },

    test: function(req, res) {
        return res.status(200).send({
            message: 'soy el metodo o accion de test del controlador citie'
        });
    },

    saveCities: function (req, res) {
        var citie = new Citie();

        var params = req.body;
        citie.name = params.name;
        citie.description = params.description;
        citie.departmen = params.departmen;
        citie.image = null;

        citie.save((err, projectStores ) => {
            if (err) return res.status(500).send({message: 'error al guardar'});
            if (!projectStores) return res.status(404).send({message: 'no se a podido guardar el proyecto'});
            return res.status(200).send({citie: projectStores});
        });

    },

    getCitie: function(req, res) {
        var citieId = req.params.id;

        if(citieId == null) return res.status(404).send({message: 'no existe el proyecto'});
       
        Citie.findById(citieId, (err, citie) =>{
            if (err) return res.status(500).send({message: 'Error al debolver los datos'});
            if (!citie) return res.status(404).send({message: 'no existe el proyecto'});
            return res.status(200).send({citie});
        });
    },

    getCities: function(req, res) {
       
        Citie.find({}).exec((err, citie) => {
            if (err) return res.status(500).send({message: 'Error al debolver los datos'});
            if (!citie) return res.status(404).send({message: 'no existe el proyecto'});
            return res.status(200).send({citie});
        });
    },

    updateCitie: function(req, res) {
        var citieId = req.params.id;
        var update = req.body;

        Citie.findByIdAndUpdate(citieId, update, {new: true}, (err, citieUpdated) => {
            if (err) return res.status(500).send({message: 'Error al debolver actualizar los datos'});
            if (!citieUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});
            return res.status(200).send({
                citie: citieUpdated
            });
        })
    },

    deleteCities: function(req, res) {
        var citieId = req.params.id;

        Citie.findByIdAndRemove(citieId, (err, citieRemoved) => {
            if (err) return res.status(500).send({message: 'Error al eliminar los datos'});
            if (!citieRemoved) return res.status(404).send({message: 'No se puede eliminar ese poryecto'});
            return res.status(200).send({
                citie: citieRemoved});

       })
    },

    uploadImage: function(req, res) {
        var citieId = req.params.id;
        var fileName = 'Imagen no subida';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt =='gift'){
                Citie.findByIdAndUpdate(citieId, {image: fileName}, {new: true}, (err, citieUpdated) => {
                    if (err) return res.status(500).send({message: 'El archivo de la imagen no se a subido'});
                    if (!citieUpdated) return res.status(404).send({message: 'El proyecto no existe'});
                    return res.status(200).send({
                        citie: citieUpdated
                    });
                });
            } else{

                fs.unlink(filePath, (err) =>{
                    return res.status(200).send({
                        message: 'La extencion no es valida'
                    });
                });
            }


            
        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var pathFile = './uploads/'+file;

        fs.exists(pathFile, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(pathFile));
            } else{
                return res.status(200).send({
                    message: "No existe la imagen"
                });
            }
        });

    }


};

module.exports = controller;