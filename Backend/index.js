'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog',{userNewUrlParser: true})
    .then(() => {
        console.log('Conexion a la base de dato se ha realizado bien');

        //crear servidor 
        app.listen(port, () =>{
            console.log('Servidor corriendo en http://localhost:'+port);
        })
    })