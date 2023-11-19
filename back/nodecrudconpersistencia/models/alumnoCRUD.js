import  { Alumno }  from './alumnos.js';


async function consultarAlumnos() {
    const alumnos = await Alumno.findAll({
        attributes: ['nombre', 'apellido', 'email']
    })
    return alumnos.map(alumno => alumno.dataValues/**con esto nos trae los valores requeridos en json*/)
//JSON.stringify(alumnos,null,1) //con esto nos trae los valores requeridos en json

}

async function consultarAlumnoPorId(id) {
    const alumno = await Alumno.findByPk(id);
        if (!alumno ) {
            console.log('No se encontró el alumno');

        }
    return console.log(alumno.dataValues)
}

async function crearAlumno() {

    const alumno = await Alumno.create({
        nombre: 'Juan',
        apellido: 'Perez',
        email: 's3WEQWEd@asd.com',
    }, )   };

//consultarAlumnos()
//crearAlumno()
consultarAlumnoPorId(20)