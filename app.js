const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const authMiddleware = require('./middleware/authMiddleware');
const authLogin = require('./routes/authLogin');
const autolote = require('./routes/autolote');
require('dotenv').config();
const port=process.env.PORT;
const axios = require('axios');


app.use(express.json());
app.use('/',authLogin);
app.use('/',autolote);

/*-------------------------------------------HASH---------------------------------------------*/

app.get('/gethash/:plainText',authMiddleware ,async (req,res)=>{
    const plainText=req.params.plainText;
    const saltRound=10;
    const hash= await bcrypt.hashSync(plainText,saltRound);
    return res.send(hash);

    /* password hasheado: $2b$10$HmMsmDhPAMfB3XJlQhnNKuXe9a4SQWedXc7Zf83pDoDy5Qu42vlfa */


})

async function convertCurrency(amount) {
  try {
    
    const response = await axios.get('https://open.er-api.com/v6/latest/USD');
    
    if (!response.data || !response.data.rates) {
      throw new Error('No se pudieron obtener tasas de cambio');
    }
    
    const rates = response.data.rates;
    

    const conversions = {
      EUR: {
        rate: rates.EUR,
        amount: amount * rates.EUR
      },
      HNL: {
        rate: rates.HNL,
        amount: amount * rates.HNL
      },
      JPY: {
        rate: rates.JPY,
        amount: amount * rates.JPY
      }
    };
    
    return {
      success: true,
      base_currency: 'USD',
      amount,
      conversions,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error en conversión de moneda:', error.message);
    return {
      success: false,
      error: 'No se pudo realizar la conversión de moneda'
    };
  }
}





app.listen(port, () => {
    console.log(`Server iniciado en puerto ${port}`);
})