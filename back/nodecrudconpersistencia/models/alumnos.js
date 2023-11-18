import {DataTypes } from 'sequelize';

import {sequelize} from 'db.js';//importamos el modelo de conexion

const Alumno = sequelize.define('Alumnos', {//definimos el modelo de la tabla los nombres se deben llamar igual al de la tabla
idAlumno:DataTypes.INTEGER,
nombre:DataTypes.STRING,
apellido:DataTypes.STRING,
    email:DataTypes.STRING,
});

export default Alumno; // exportamos el modelo para poder usarlo en alumnoCRUD.js