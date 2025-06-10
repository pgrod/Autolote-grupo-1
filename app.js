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


app.listen(port, () => {
    console.log(`Server iniciado en puerto ${port}`);
})