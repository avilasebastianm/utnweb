import { Sequelize } from 'sequelize';
import {dotevn} from 'dotenv';// para ocultar la contraseña importamos dotenv previamente instalado en '.env' ponemos la ruta donde tenemos el archivo con la contraseña
//const { Sequelize } = require('sequelize');
dotevn.config();// para ocultar la contraseña importamos dotenv previamente instalado en '.env' ponemos la ruta donde tenemos el archivo con la contraseña

// paso 1 crear la conexion con los datos de la db usuario, contraseña(la contrasena la ocultamos en una variable de entorno),
const sequelize = new Sequelize('dbcrudnode', 'seba', process.env.PASSWORD, {
    host: 'localhost',
    dialect:  'mysql'
});

// paso 2 probar la conexion con la db

const conectarDB = async() => {
    try {

        await sequelize.authenticate();
        console.log('conecion establecida con la db.');
    } catch (error) {
        console.error('no se pudo conectar con la db:', error);
    }
};

export default sequelize; // exportamos la conexion para poder usarla en alumnos.js