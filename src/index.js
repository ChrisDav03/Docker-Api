const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();
const agronomicActivityRoutes = require("./routes/agronomicActivity");
const plotLandRoutes = require("./routes/plotLand");
const app = express();
const port = process.env.PORT || 9000;


//middleware
app.use(cors());
app.use(express.json());
app.use('/api', agronomicActivityRoutes);
app.use('/api', plotLandRoutes);



app.get('/', (req,res)=>{
    res.send('Welcome to my API')
});


mongoose
.connect(process.env.MONGODB_URI)
.then(()=>console.log('Conectado a Atlas'))
.catch((error)=> console.log(error))

app.listen(port, () => console.log ('Servidor en el puerto ', port));
