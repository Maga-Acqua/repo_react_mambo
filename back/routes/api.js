var express = require('express');
var router = express.Router();
var productosModel = require('../models/ProductosModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/productos', async function(req, res, next) {
    let productos = await productosModel.getProductos();

    productos = productos.map(producto => {
        if(producto.img_id){
            const imagen = cloudinary.url(producto.img_id, { 
              width:500, 
              height:500, 
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

router.post('/contacto', async(req, res) => {
  const mail = {
    to: 'maga.acqua74@gmail.com',
    subject: 'Contacto Web',
    html: `${req.body.nombre} se contacto a traves de la web y quiere mas info a este correo: 
        ${req.body.email} <br> Ademas, hizo el siguiente comentario: ${req.body.mensaje}
        <br> Su tel es ${req.body.telefono}`
  }
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  await transport.sendMail(mail);
  res.status(201).json({
    error: false,
    message: 'Mensaje enviado!'
  });
});

module.exports = router;