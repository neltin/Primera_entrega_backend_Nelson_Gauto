const express = require('express');
const AppRouters = require('./routers/app.routers');

const PORT = 8080;
//Inicializacion
const app = express();

//Parseo json.parse
app.use(express.json()); //Parse de los Objetos que van por Body
app.use(express.urlencoded({ extended: true })); //Parseo de los formularios

//Router
app.use(AppRouters);

//Incorporar con express
app.use(express.static('public'));


//Middleware Error
app.use((error, req, res, next)=>{


})

//Puesto en Marcha
app.listen(PORT, () => {
    console.log("El servidor esta levantado y corriendo por el puerto", PORT);
});