import { Sequelize } from 'sequelize';

import dotevn from 'dotenv';// para ocultar la contraseña importamos dotenv previamente instalado en '.env' ponemos la ruta donde tenemos el archivo con la contraseña

    dotevn.config();// para ocultar la contraseña importamos dotenv previamente instalado en '.env' ponemos la ruta donde tenemos el archivo con la contraseña

const password = process.env.PASSWORD;
const sequelize = new Sequelize('dbcrudnode', 'seba', '4854', {
    host: 'localhost',
    dialect:  'mysql'
});

// paso 2 probar la conexion con la db

const autenticar = async() => {
    try {

        await sequelize.authenticate();
        console.log('conecion establecida con la db.');
    } catch (error) {
        console.error('no se pudo conectar con la db:', error);
    }
};
autenticar();
export   {sequelize}; //exportamos la conexion para poder usarla en alumnos.js