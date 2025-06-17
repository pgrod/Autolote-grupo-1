const express = require('express');
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

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
    });
});

module.exports = router;
