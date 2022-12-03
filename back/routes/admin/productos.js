var express = require('express');
var router = express.Router();
var productosModel = require('../../models/ProductosModel');

router.get('/', async function(req, res, next) {
    var productos = await productosModel.getProductos();
    res.render('admin/productos', { 
      layout: 'admin/layout',
      user: req.session.user,
      productos });
  });

  router.get('/agregar', async function(req, res, next) {
    res.render('admin/agregar', {
      layout: 'admin/layout'
    })
  });

  router.post('/agregar', async function(req, res, next){
    try{
      if(req.body.titulo != ""){
        await productosModel.insertProduct(req.body);
        res.redirect('/admin/productos');
      } else {
        res.render('admin/agregar', {
          layout:'admin/layout',
          error: true, message:'Campos faltantes!'
        });
      }
    } catch(error){
     console.log(error);
     res.render('admin/agregar', {
      layout:'admin/layout',
      error: true, message: "No se cargo el producto."
     });
    }
  });

  router.get('/eliminar/:id', async function(req, res, next){
    var id = req.params.id;
    await productosModel.deleteProductById(id);
    res.redirect('/admin/productos');
  });

  router.get('/editar/:id', async function(req, res, next){
    let id = req.params.id;
    let producto = await productosModel.getProducById(id);
    res.render('admin/editar',{
      layout: 'admin/layout',
      producto
    })
  });

  router.post('/editar', async function(req,res,next){
    try{
      let obj = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo_objeto: req.body.tipo_objeto,
        precio: req.body.precio,
        link_imagen: req.body.link_imagen
      }
      await productosModel.editProductById(obj, req.body.id);
      res.redirect('/admin/productos'); 
    } catch(error){
      console.log(error);
      res.render('admin/editar', {
        layout: 'admin/layout',
        error: true, 
        message: "No se modifico el producto!"
      })
    }
  });
  
  module.exports = router;