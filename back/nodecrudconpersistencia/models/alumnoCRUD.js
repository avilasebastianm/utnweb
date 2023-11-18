import  {Alumno}  from './alumnos.js';
import {sequelize} from './db.js';
//importamos el modelo de la tabla desde db.js



async function consultarAlumnos() {
    const alumnos = await Alumno.findAll()
    console.log(alumnos)
}


