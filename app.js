const express = require('express');
const pool = require('./config/db'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT;
const authMiddleware = require('./middleware/authMiddleware');

require('dotenv').config();



app.use(express.json());




/*-------------------------------------------Login---------------------------------------------*/

app.post('/login',async (req,res)=>{

    const userAuth=req.body;

    if(!userAuth.username || !userAuth.password){
        return res.status(403).send({status:403,message:"Todos los campos son requeridos"});
    }

    const sql='select * from user where username=?';

    pool.query(sql,[userAuth.username],async(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta..."});
        }

        if(result.length===0){
            return res.status(401).json({status:401,message:"Credenciales invalidas"});
        }

        let user=result[0];
        const isMatch= await bcrypt.compare(userAuth.password,user.password);

        if(!isMatch){
            return res.status(401).json({status:401,message:"Credenciales invalidas"});
        }



        const token=jwt.sign(
            {username: user.username,},
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        )



        res.status(200).json({status:200,message:"Sucess",token:token});
    })

})

app.get('/gethash/:plainText',authMiddleware ,async (req,res)=>{
    const plainText=req.params.plainText;
    const saltRound=10;
    const hash= await bcrypt.hashSync(plainText,saltRound);
    return res.send(hash);

    /* password hasheado: $2b$10$HmMsmDhPAMfB3XJlQhnNKuXe9a4SQWedXc7Zf83pDoDy5Qu42vlfa */


})



/*-------------------------------------------APIS Clientes---------------------------------------------*/

app.get('/clientes',authMiddleware,(req,res)=>{
    const sql='SELECT * FROM clientes';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:result});
        }
    })
})


app.post('/clientes',authMiddleware,(req,res)=>{
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


app.put('/clientes',authMiddleware,(req,res)=>{
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


app.delete('/clientes',authMiddleware,(req,res)=>{
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

app.get('/vehiculos',authMiddleware,(req,res)=>{
    const sql='SELECT * FROM vehiculos';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:result});
        }
    })
})

app.post('/vehiculos',authMiddleware,(req,res)=>{
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

app.put('/vehiculos/:id',authMiddleware,(req,res)=>{
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

app.delete('/vehiculos/:id',authMiddleware,(req,res)=>{
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

app.get('/ventas',authMiddleware,(req,res)=>{
    const sql='SELECT * FROM ventas';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({status:500,message:"Error en la consulta",data:null});
        }else{
            return res.status(200).json({status:200,message:"Sucess",data:result});
        }
    })
})


app.post('/ventas',authMiddleware,(req,res)=>{
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


app.put('/ventas',authMiddleware,(req,res)=>{
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


app.delete('/ventas',authMiddleware,(req,res)=>{
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


app.listen(port, () => {
    console.log(`Server iniciado en puerto ${port}`);
})