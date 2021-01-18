'use strict'

//cargar modulos
var express = require('express');
var bodyParser = require('body-parser');
const { restart } = require('nodemon');

//ejecutar express (http)
var app = express();
//cargar ficheros de rutas
var article_routes = require('./routes/article');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//añadir prefijos a rutas
app.use('/api', article_routes);

//ruta o metodo de prueba Api Rest
/*
app.post('/datos-curso', (req, res) => {
    var hola = req.body.hola;
    
    return res.status(200).send({
        curso: 'Master en Frameworks JS',
        autor: 'Nicky',
        hola
    });
});
*/

//EXportar modulos 
module.exports = app;