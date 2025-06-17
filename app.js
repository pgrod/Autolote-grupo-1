const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT;
const authMiddleware = require('./middleware/authMiddleware');
const authLogin = require('./routes/authLogin');
const clientes = require('./routes/clientes');
const vehiculos = require('./routes/vehiculos');
const ventas = require('./routes/ventas');

require('dotenv').config();

app.use(express.json());

app.use('/', authLogin);
app.use('/', clientes);
app.use('/', vehiculos);
app.use('/', ventas);

app.get('/gethash/:plainText',authMiddleware ,async (req,res)=>{
    const plainText=req.params.plainText;
    const saltRound=10;
    const hash= await bcrypt.hashSync(plainText,saltRound);
    return res.send(hash);

    /* password hasheado: $2b$10$HmMsmDhPAMfB3XJlQhnNKuXe9a4SQWedXc7Zf83pDoDy5Qu42vlfa */


});



app.listen(port, () => {
    console.log(`Server iniciado en puerto ${port}`);
})