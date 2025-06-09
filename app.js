const express = require('express');
const mysql=require('mysql2')
const app = express();
const port=3000;


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


/*-------------------------------------------APIS---------------------------------------------*/

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








/*-------------------------------------------APIS---------------------------------------------*/


app.listen(port, () => {
    console.log(`Server iniciado en puerto ${port}`);
})