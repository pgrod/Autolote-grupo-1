const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');







/*-------------------------------------------APIS Clientes---------------------------------------------*/

router.get('/clientes',authMiddleware,(req,res)=>{
    const sql='SELECT * FROM clientes';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:result});
        }
    })
})


router.post('/clientes',authMiddleware,(req,res)=>{
    const cliente=req.body;

    const sql="insert into clientes (nombre,apellido,correo,telefono,direccion) values (?,?,?,?,?)";
    pool.query(sql,[cliente.nombre,cliente.apellido,cliente.correo,cliente.telefono,cliente.direccion],(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:cliente});
        }
    })
})


router.put('/clientes',authMiddleware,(req,res)=>{
    const id=req.params.id;
    const cliente=req.body;
    const sql="update clientes set nombre=?,apellido=?,correo=?, telefono=?, direccion=? where id=?";
    pool.query(sql,[cliente.nombre,cliente.apellido,cliente.correo,cliente.telefono,cliente.direccion,cliente.id],(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:cliente});
        }
    })
})


router.delete('/clientes',authMiddleware,(req,res)=>{
    const cliente=req.body;
    const sql="delete from clientes where id=?";
    pool.query(sql,[cliente.id],(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:null});
        }
    })
})



/*----------------------------------------APIs Vehiculos-----------------------------------------*/

router.get('/vehiculos',authMiddleware,(req,res)=>{
    const sql='SELECT * FROM vehiculos';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:result});
        }
    })
})

router.post('/vehiculos',authMiddleware,(req,res)=>{
    const vehiculo=req.body;

    const sql="insert into vehiculos (marca,modelo,año,precio,descripcion) values (?,?,?,?,?)";
    pool.query(sql,[vehiculo.marca,vehiculo.modelo,vehiculo.año,vehiculo.precio,vehiculo.descripcion],(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:vehiculo});
        }
    })
})

router.put('/vehiculos/:id',authMiddleware,(req,res)=>{
    const id=req.params.id;
    const vehiculo=req.body;
    const sql="update vehiculos set marca=?,modelo=?,año=?, precio=?, descripcion=? where id_vehiculo=?";
    pool.query(sql,[vehiculo.marca,vehiculo.modelo,vehiculo.año,vehiculo.precio,vehiculo.descripcion,id],(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:vehiculo});
        }
    })
})

router.delete('/vehiculos/:id',authMiddleware,(req,res)=>{
    const id=req.params.id;
    const sql="delete from vehiculos where id_vehiculo=?";
    pool.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:null});
        }
    })
})

/*-------------------------------------------APIS Ventas---------------------------------------------*/

router.get('/ventas',authMiddleware,(req,res)=>{
    const sql='SELECT * FROM ventas';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:result});
        }
    })
})


router.post('/ventas',authMiddleware,(req,res)=>{
    const venta=req.body;

    const sql="insert into ventas (fecha_de_venta,id_vehiculo_vendido,id_cliente_comprador,id_del_vendedor,precio_total,impuestos_aplicados) values (?,?,?,?,?,?)";
    pool.query(sql,[venta.fecha_de_venta,venta.id_vehiculo_vendido,venta.id_cliente_comprador,venta.id_del_vendedor,venta.precio_total,venta.impuestos_aplicados],(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:cliente});
        }
    })
})


router.put('/ventas',authMiddleware,(req,res)=>{
    const id=req.params.id;
    const venta=req.body;
    const sql="update ventas set fecha_de_venta=?,id_vehiculo_vendido=?,id_cliente_comprador=?, id_del_vendedor=?, precio_total=?,impuestos_aplicados=? where id=?";
    pool.query(sql,[venta.fecha_de_venta,venta.id_vehiculo_vendido,venta.id_cliente_comprador,venta.id_del_vendedor,venta.precio_total,venta.impuestos_aplicados,venta.id],(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:cliente});
        }
    })
})


router.delete('/ventas',authMiddleware,(req,res)=>{
    const venta=req.body;
    const sql="delete from ventas where id=?";
    pool.query(sql,[venta.id],(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:null});
        }
    })
})


/*-------------------------------------------APIS---------------------------------------------*/

module.exports = router;