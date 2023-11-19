import {DataTypes } from 'sequelize';//importamos el modelo de datos de sequelize para poder usarlo idAlumno:DataTypes.INTEGER

import {sequelize} from '../db.js';//importamos la conexion a la db

const Alumno = sequelize.define('alumnos', {//definimos el modelo de la tabla los nombres se deben llamar igual al de la tabla

nombre:DataTypes.STRING,
apellido:DataTypes.STRING,
    email:DataTypes.STRING,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
},{
    timestamps:false,//configuramos para que no cree los campos createdAt y updatedAt
        freezetableName:true,//configuramos para que no cambie el nombre de la tabla

});

export {Alumno}; //exportamos el modelo para poder usarlo en alumnoCRUD.js