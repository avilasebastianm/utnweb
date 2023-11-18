/** levantar un servidor
 * 1.crear archivo index.js
 * 2.node init -y (para crear el package.json)
 * 1. Crear un servidor de express npm install express
 * importar express
 * const app = require ('express')
 * const app = express()
 * const port = 3000 definimos el puerto
 * arrancar el servidor
 * app.listen(port,()=>{console.log("Servidor iniciado en el puerto ${port}");})
 */

const express = require('express');
const app = express();//ejecutamos express
const ruta = `/alumno/:id` //ruta con parametro
app.use(express.json());//ejecutamos el json
const {body, validationResult} = require('express-validator');//paso 2 (pass)usaremos express-validator para validar la contraseña lo instalamos con npm install express-validator


const alumnos = [
    {id: 1,
        nombre: "Juan",
        email: "123@asd.com",
        cursos: [{codigo: "k230", nombre: "Programacion"},{codigo: "k232", nombre: "Matematica"}]},
    {id: 2,
        nombre: "Maria",
        email: "maria@asd.com",
        cursos: [ {codigo: "k231", nombre: "Fisica" }, {codigo: "k233",nombre: "Quimica"} ] },
    {id: 3,
        nombre: "Carlos",
        email: "carlos@asd.com",
        cursos: [{ codigo: "k234",nombre: "Biologia" }, { codigo: "k235",nombre: "Historia"}]},
    {id: 4,
        nombre: "Ana",
        email: "ana@asd.com",
        cursos: [ {codigo: "k236", nombre: "Geografia" }, {codigo: "k237", nombre: "Arte"} ] },
    {id: 5,
        nombre: "Pedro",
        email: "pedro@asd.com",
        cursos: [ {codigo: "k238", nombre: "Musica" }, {codigo: "k239",nombre: "Literatura" }] },
    { id: 6,
        nombre: "Laura",email: "laura@asd.com",
        cursos: [{ codigo: "k240",nombre: "Filosofia" },{codigo: "k241", nombre: "Psicologia" }] },
    {id: 7,
        nombre: "Javier",
        email: "javier@asd.com",
        cursos: [ { codigo: "k242", nombre: "Sociologia" },{  codigo: "k243", nombre: "Antropologia" }]},
    { id: 8,
        nombre: "Sofia",
        email: "sofia@asd.com",
        cursos: [ {codigo: "k244",nombre: "Economia"}, {codigo: "k245",nombre: "Politica" } ] },
    {id: 9,
        nombre: "Luis",
        email: "luis@asd.com",
        cursos: [{codigo: "k246",nombre: "Derecho"},{codigo: "k247",nombre: "Teatro" } ] },
    { id: 10,
        nombre: "Carmen",
        email: "carmen@asd.com",
        cursos: [ {codigo: "k248",nombre: "Cine" }, {codigo: "k249", nombre: "Danza"} ]}
]
function esElMismoId(alumno,idQuery){
    return alumno.id == idQuery;}
function setearUserId(req,res,next){
    req.userId= req.params.id;
    next()}
function validateUserId(req,res,next){
    const {userId} = req;//La línea de código const {userId} = req; es un ejemplo de una técnica en JavaScript llamada asignación por desestructuración12. Esta técnica permite extraer propiedades de un objeto o elementos de un array en variables individuales12.
    if(isNaN(userId)){
        next({message:"El id no es un numero",status:400})
    }else{
        next(); }}

function badRequest(err,req,res,next){
    res.status(404).json({message:err.message});
return new Error("Error en la peticion");}

function okMiddleware (req,res){
    res.json(req.alumnoObtenido);}


const obtenerUserPorId =function (req,res,next){
    const {userId} = req;
    const alumnoObtenido = alumnos.find(alumno => esElMismoId(alumno,userId));
    req.alumnoObtenido = alumnoObtenido;
    next();}

function errorValidatorMiddleware(req,res,next){ //paso 3 (pass)usaremos express-validator para validar la contraseña lo instalamos con npm install express-validator
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.send({errors: result.array()}) ;
    }
next()
    }
const esContrasenaFuerte = body('password').isStrongPassword({//paso 4 (pass)usaremos check para saber si la contrse;a es fuerte si no lo es nos dara un mesaje de error
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,

 }).withMessage('La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un simbolo')

const nameValidator = body('name').isLength({min:3}).withMessage('El nombre debe tener al menos 3 caracteres')

    app.get(ruta,setearUserId,validateUserId,obtenerUserPorId,badRequest,okMiddleware);//EN ESTE GET SE EJECUTAN LOS MIDDLEWARES YA DEFINIDOS EN EL ORDEN QUE SE PONEN
    app.post("/alumno",nameValidator,esContrasenaFuerte,errorValidatorMiddleware,okMiddleware);//EN ESTE POST SE EJECUTAN LOS MIDDLEWARES YA DEFINIDOS EN EL ORDEN QUE SE PONEN
    app.listen(3000,()=>{console.log("Servidor iniciado");})