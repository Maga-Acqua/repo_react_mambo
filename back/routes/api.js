var express = require('express');
var router = express.Router();
var productosModel = require('../models/ProductosModel');

router.get('/productos', async function(req, res, next) {
    let productos = await productosModel.getProductos();

    productos = productos.map(producto => {
        if(producto.img_id){
            const imagen = cloudinary.image(producto.img_id, { 
              width:960, 
              height:200, 
              crop:'fill' 
            });
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

    res.json(productos);
});

module.exports = router;