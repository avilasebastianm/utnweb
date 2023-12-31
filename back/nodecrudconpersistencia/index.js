/** levantar un servidor
 * 1.crear archivo index.js
 * 2.node init -y (para crear el package.json)
 * 3. Crear un servidor de express npm install express
 * importar express
 * const app = require ('express')
 * const app = express()
 * const port = 3000 definimos el puerto
 * 4. instalar sequelize
 * npm install sequelize sqlite3
 * npm install mysql2
 * instalamos dotenv para ocultar la contraseña npm install dotenv
 *crear archivo db.js y crear la conexion en ella
 * creamos una variable de entorno para ocultar la contraseña tiene que terminar en .env
 * creamos el modelo(db) en otro archivo llamado alumnos.js
 * arrancar el servidor
 * app.listen(port,()=>{console.log("Servidor iniciado en el puerto ${port}");})
 */


import express from 'express';
const app = express();//ejecutamos express
const ruta = `/alumno/:id` //ruta con parametro
app.use(express.json());//ejecutamos el json
app.use(express.urlencoded({extended:false}));
import {body, validationResult} from 'express-validator';
app.listen(3000,()=>{console.log("Servidor iniciado");})