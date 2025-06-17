const express = require('express');
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

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
    });
});

module.exports = router;
