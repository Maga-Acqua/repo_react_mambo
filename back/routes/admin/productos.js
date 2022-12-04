var express = require('express');
var router = express.Router();
var productosModel = require('../../models/ProductosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;

const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function(req, res, next) {
    var productos = await productosModel.getProductos();
    productos = productos.map(producto => {
      if(producto.img_id){
        var imagen = cloudinary.image(producto.img_id, { width:100, height:100, crop:'fill' });
        return {
          ...producto,
          imagen
        }
      } else {
        return {
          ...producto,
          imagen: ''
        }
      }
    });

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
      // Upload imagen
      var img_id = '';
      if(req.files && Object.keys(req.files).length > 0){
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
      }
      console.log(img_id);
      if(req.body.titulo != ""){
        await productosModel.insertProduct({
          ...req.body,
          img_id
        });
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

    let producto = await productosModel.getProducById(id);
    if(producto.img_id){
      await destroy(producto.img_id);
    }

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
      let img_id = req.body.img_original;
      let borrar_img_anterior = false;
      if(req.body.img_delete ==="1"){
        img_id = null;
        borrar_img_anterior = true;
      } else {
        if(req.files && Object.keys(req.files).length > 0){
          imagen = req.files.imagen;
          img_id = ( await uploader(imagen.tempFilePath)).public_id;
          borrar_img_anterior = true;
        }
      }
      if(borrar_img_anterior && req.body.img_original){
        await destroy(req.body.img_original);
      }

      let obj = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo_objeto: req.body.tipo_objeto,
        precio: req.body.precio,
        img_id
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