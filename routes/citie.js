'use strict'

var express = require('express');
var CitiesControllers = require('../controlers/citie');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

router.get('/home', CitiesControllers.home);
router.post('/test', CitiesControllers.test);
router.post('/save', CitiesControllers.saveCities);
router.get('/citie/:id?', CitiesControllers.getCitie);
router.get('/cities', CitiesControllers.getCities);
router.put('/citie/:id', CitiesControllers.updateCitie);
router.delete('/citie/:id', CitiesControllers.deleteCities);
router.post('/upload-image/:id', multipartMiddleware, CitiesControllers.uploadImage);
router.get('/get-image/:image', CitiesControllers.getImageFile);



module.exports = router;

