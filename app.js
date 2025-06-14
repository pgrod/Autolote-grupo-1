const express = require('express');
const mysql=require('mysql2')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const port=3000;

/*-------------------------------------------Base de Datos--------------------------------------*/ 
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'admin123',
    database:'flota',
})




pool.getConnection((err,connection)=>{
    err? console.log("No se pudo conectar a la base de datos"):console.log("Conexion Exitosa");
})


app.use(express.json());


/*-------------------------------------------APIS Clientes---------------------------------------------*/

app.get('/clientes',(req,res)=>{
    const sql='SELECT * FROM clientes';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:result});
        }
    })
})


app.post('/clientes',(req,res)=>{
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


app.put('/clientes',(req,res)=>{
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


app.delete('/clientes',(req,res)=>{
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



app.get('/clientes',(req,res)=>{
    const sql='SELECT * FROM clientes';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:result});
        }
    })
})

/*----------------------------------------APIs Vehiculos-----------------------------------------*/ 

app.get('/vehiculos',(req,res)=>{
    const sql='SELECT * FROM vehiculos';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:result});
        }
    })
})

app.post('/vehiculos',(req,res)=>{
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

app.put('/vehiculos/:id',(req,res)=>{
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

app.delete('/vehiculos/:id',(req,res)=>{
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






/*-------------------------------------------APIS---------------------------------------------*/


app.listen(port, () => {
    console.log(`Server iniciado en puerto ${port}`);
})