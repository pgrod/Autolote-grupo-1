const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();

require('dotenv').config();

router.post('/login',async (req,res)=>{

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
    });

});



module.exports = router;

