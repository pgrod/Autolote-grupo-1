require('dotenv').config();
const mysql=require('mysql2')



/*-------------------------------------------Base de Datos--------------------------------------*/
const pool=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
})


pool.getConnection((err,connection)=>{
    err? console.log("No se pudo conectar a la base de datos"):console.log("Conexion Exitosa");
})

module.exports=pool;