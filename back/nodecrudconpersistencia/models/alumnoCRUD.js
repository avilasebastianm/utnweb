import  { Alumno }  from './alumnos.js';
import e from "express";


async function consultarAlumnos() {
    const alumnos = await Alumno.findAll({
        attributes: ['id','nombre', 'apellido', 'email']
    })
    console.log( alumnos.map(alumno => alumno.dataValues/**con esto nos trae los valores requeridos en json*/))
//JSON.stringify(alumnos,null,1) //con esto nos trae los valores requeridos en json

}

async function consultarAlumnoPorId(id){
    return  await Alumno.findByPk(id)
        .then((alumno) => {
        if (!alumno ) {
            throw new Error('No se encontro el alumno')
        }
            return alumno.dataValues
    })
            .catch((error) => {
       throw error;
    });
}

async function crearAlumno(nombre, apellido, email) {

    return await Alumno.create({
        nombre: nombre,
        apellido: apellido,
        email: email,
    },).then((alumno) => {
        return alumno.dataValues
    }).catch((error) => {
            throw error;
        });
    };

async function actualizarAlumno(id, nombre, apellido, email) {
    return await Alumno.update({
        nombre: nombre,
        apellido: apellido,
        email: email,
    }, {
        where: {
            id: id
        }
    }).then((alumno) => {
        return alumno.dataValues
    }).catch((error) => {
        throw error;
    });
};
async function eliminarAlumno(id) {
    return await Alumno.destroy({
        where: {
            id: id
        }
    }).then((alumno) => {
        return alumno.dataValues
    }).catch((error) => {
        throw error;
    });
};



//consultarAlumnos()
//crearAlumno()
//consultarAlumnoPorId(20)
//crearAlumno('seba','gomez','awsd@asd')
eliminarAlumno(17);
//actualizarAlumno(17,'maxi','perez','awsd@asd')