'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');
const article = require('../models/article');
var Article = require('../models/article');
const { exists } = require('../models/article');

var controller = {

    datoCurso: (req, res) => {
        var hola = req.body.hola;
        
        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor: 'Nicky',
            hola
        });
    }, 

    test: (req, res) => {
        return res.status(200).send({
            menssage: 'soy la accion test'
        });
    },

    save: (req,res) =>{
        //recoger parametros por post
        var params = req.body;
      
        //validar datos
        try{
            var validate_tittle = !validator.isEmpty(params.tittle);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
            status: 'error'
            return   res.status(200).send({
                menssage: 'Faltan datos por enviar !!!'
            });
        }

        if(validate_tittle && validate_content){
        //Crear el objeto a guardar
            var article = new Article();
        
        //asignar valores
            article.tittle = params.tittle;
            article.content = params.content;
            article.image = null;
        //guardar el articulo
            article.save((err,articleStored) => {

                if(err || !articleStored){
                    return   res.status(404).send({
                        menssage: ' el articulo no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            });

        //devolver respuesta
        

           /* return   res.status(200).send({
                menssage: 'validacion correcta'
            });
            */
        }else{
            status: 'error';
            return   res.status(200).send({
                menssage: ' los datos no son validos'
            });
        }
        
    },

    getArticles: (req, res) => {

            var query = Article.find({});
            var last = req.params.last;
            
            if(last || last != undefined ){
                    query.limit(5);

            }

        //find 
        query.sort('-_id').exec((err, articles) => {
            
            if(err){
                return   res.status(500).send({
                    status: 'error',
                    menssage: 'error a devolver lo articulos.'           
                
                });

            }

            if(!articles){
                return   res.status(404).send({
                    status: 'error',
                    menssage: 'No hay articulo para mostrar.'           
                
                });

            }
            

            return   res.status(200).send({
                status: 'success',
                articles           
            
            });
        })

        
    },

    getArticle: (req, res) => { 

        //recoger el id de la url 
        var articleId = req.params.id;


        //Comprobar que existe
        if(!articleId || articleId == null){
            return   res.status(404).send({
                status: 'error',
                menssage: 'No existe este articulo.'           
            
            });

        }

        //buscar el articulo 
        Article.findById(articleId, (err, article) =>{
            

            if(err || !article){
                return  res.status(404).send({
                    status: 'error',
                    menssage: 'No existe este articulo.'           
                
                });

            }
             //devolverlo

        return res.status(404).send({
            status: 'success',
             article           
        
        });

        });

       
               
        
    },
   update: (req, res) => {

        //recoger el ide de los articulo por url
        var articleId = req.params.id;

        //Recoger los datos que llegar por url
        var params = req.body;

        //validar datos
        try{
            var validate_tittle = !validator.isEmpty(params.tittle);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
            return  res.status(200).send({
                status: 'error',
                menssage: 'Faltan datos por enviar.'           
            
            });
        }

        if(validate_tittle && validate_content){
                //Find and update
                Article.findOneAndUpdate({_id: articleId}, params, {new: true}, (err, articleUpdate) =>{
                    if(err){
                        return  res.status(500).send({
                            status: 'error',
                            menssage: 'error al actualizar'           
                        
                        });
                    }
                    if(!articleUpdate){
                        return  res.status(404).send({
                            status: 'error',
                            menssage: 'no existe el acrticulo'           
                        
                        });
                    }
                    return  res.status(200).send({
                        status: 'success',
                        article: articleUpdate           
                    
                    });

                });
        }else{

            //Devolver respuesta
    return  res.status(200).send({
        status: 'error',
        menssage: 'La validacion no es correcta'           
    
    });
        }
         


        
   },
   
   delete: (req, res) =>{
       //recoger el id de la url
        var articleId = req.params.id;

       //find an delete 
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) =>{
            if(err){
                return  res.status(500).send({
                    status: 'error',
                    menssage: 'Error al borrar'           
                
                });
            }

            if(!articleRemoved){
                return  res.status(404).send({
                    status: 'error',
                    menssage: 'No se ha borrado el articulo Posiblemente no exista'           
                
                });
            }

            return  res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });

    },

    upload: (req,res) => {

        //configurar el modulo connect multiparty router/article.js

        //recoger el fichero de la peticion
        var file_name = 'imagen no subida...';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                menssage: file_name
            });

        }
        //conseguir el nombre y la extension del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        //nombre del archivo
        var file_name = file_split[2];

        //extension del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];
        

        //comprobar la extension, solo imagen y si no es valida borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            //borrar el archivo subido

            fs.unlink(file_path, (err) =>{
                return  res.status(200).send({
                    status: 'error',
                    menssage: 'la extension de la imagen no es valida'
                 });
            });
        }else{
            //sacando id de la url
            var articleId = req.params.id;

            Article.findOneAndUpdate({_id:articleId }, {image: file_name}, {new: true}, (err, articleUpdate) =>{
            
                if(err || !articleUpdate){
                    return  res.status(200).send({
                        status: 'error',
                        menssage: 'Error al guardar la imagen del articulo'
                     }); 
                }

                return  res.status(200).send({
                    status: 'success',
                    article: articleUpdate
                 });
            });

            
        }

        //si todo es valida

        //buscar el articulo, asignarle el nombre de la imagen y actualizarlos


        
        },
        getImage: (req, res) => {
            var file = req.params.image;
            var path_file = './upload/articles/'+file;

            fs.exists(path_file, (exists) =>{
                
                if(exists){
                    return res.sendFile(path.resolve(path_file));
                }else{
                    return  res.status(404).send({
                        status: 'error',
                        menssage: 'la imagen no existe'
                     }); 
                }
            });

        
        },

        search: (req, res) =>{

            //sacar el string a buscar 
            var searchString = req.params.search;

            //find or
            Article.find({"$or":[
                {"tittle": {"$regex": searchString, "$options": "i"}},
                {"content": {"$regex": searchString, "$options": "i"}},
            ]})
            .sort([['date', 'descending']])
            .exec((err, articles) =>{

                if(err){
                    return  res.status(500).send({
                        status: 'error',
                        menssage: ' error en la peticion.'
                        
                     }); 
                }
                if(!articles || articles.length <= 0){
                    return  res.status(404).send({
                        status: 'error',
                        menssage: ' No hay un articulo que coincidan.'
                        
                     }); 
                }


                return  res.status(200).send({
                    status: 'success',
                    articles
                 }); 
            })
            
        }



   


};

module.exports = controller;