import express from "express";
const app = express(); // Creamos una instancia de la libreria
const port = 3001; // Definimos el puerto

app.use(express.json()); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido JSON
app.use(express.urlencoded({ extended: false })); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido codificado en URL

import { body, validationResult } from "express-validator";

const alumnos = [
  {
    id: 1,
    nombre: "Juan Perez",
    apellido: "Perez",
    email: "jperez@codoacodo.com",
    cursos: [
      { codigo: "k200", nombre: "Paradigmas de la Programación" },
      { codigo: "k201", nombre: "Testing" },
    ],
  },
  {
    id: 2,
    nombre: "Facundo Perez",
    email: "fperez@codoacodo.com",
    cursos: [
      { codigo: "k200", nombre: "Programación Fullstack. js" },
      { codigo: "k201", nombre: "Testing" },
    ],
  },
];

// Middlewares para el get "/alumno/list"
// Paso 1 - Obtener todos los alumnos
function obtenerTodosLosAlumnos(req, res) {
  res.json(alumnos); // Devuelve la lista de alumnos en formato JSON
}

// Middlewares para el get "/alumno/:id"
// Paso 1 Setearel el ID de alumno
function setearIdAlumno(req, res, next) {
  const id = req.params.id; // Obtiene el ID proporcionado en la URL
  req.idAlumno = id; // Setea el ID de alumno en el objeto de solicitud
  next();
}

// Paso 2  Validar el ID de usuario para que sea un numero entero
function validarIdEnRuta(req, res, next) {
  if (isNaN(req.idAlumno)) {
    next({
      codigo: 400,
      message: `El ID debe ser un numero entero y escribiste: '${req.idAlumno}' , es incorrecto.`,
    });
  } else {
    next();
  }
}

// Paso 3 Obtener el alumno por ID
function obtenerAlumnoPorId(req, res, next) {
  const alumno = alumnos.find((alumno) => alumno.id === parseInt(req.idAlumno)); // Busca el alumno con el ID correspondiente
  if (alumno) {
    req.alumno = alumno;
    next(); // Devuelve el alumno encontrado
  } else {
    next({
      codigo: 404,
      message: `No existe un alumno con el ID: '${req.idAlumno}'`,
    });
  }
  next();
}

// Paso 4 okMiddleware
function okMiddlewareGet(req, res, next) {
  res.json(req.alumno);
}

// Middlewares para el post "/alumno"
// Paso 1  setear los datos obtenidos del cuerpo de la solicitud
function setearDatosAlumno(req, res, next) {
  const { id, nombre, apellido, email, cursos } = req.body; // Obtener los datos del cuerpo de la solicitud
  req.datosAlumno = { id, nombre, apellido, email, cursos }; // Setear los datos en el objeto de solicitud
  next();
}

// Paso 2 Validar los datos del body

//validar que los campos id, nombre, apellido y email existan
function validarCamposRequeridos(req, res, next) {
  const camposIncompletos = [];

  // Verificar los campos requeridos
  ["id", "nombre", "apellido", "email"].forEach((campo) => {
    if (!req.body[campo]) {
      camposIncompletos.push(campo);
    }
  });

  // Comprobar si hay campos incompletos
  if (camposIncompletos.length > 0) {
    next({
      codigo: 400,
      message: `Te falta completar los siguientes campos: ${camposIncompletos.join(
        ", ",
      )}`,
    });
  } else {
    next();
  }
}

//validar si el ID que esta en el body es un numero entero
function validarIdEnBody(req, res, next) {
  const { id } = req.body; // Obtener el ID del cuerpo de la solicitud
  if (isNaN(id)) {
    next({
      codigo: 400,
      message: `El ID debe ser un número entero y escribiste: '${id}', es incorrecto.`,
    });
  } else {
    next();
  }
}

//validar el formato del email con express-validator
function validarFormatoEmail(req, res, next) {
  // Validar el formato del email con express-validator
  body("email").isEmail().withMessage("Ingrese un email correcto.")(
    req,
    res,
    function () {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        next();
      } else {
        next({
          codigo: 400,
          message: errors.array()[0].msg,
        });
      }
    },
  );
}

//Validar si el email es repetido
function validarEmailRepetido(req, res, next) {
  const { email } = req.datosAlumno; // Obtener los datos del cuerpo de la solicitud
  const alumnoRepetido = alumnos.find((alumno) => alumno.email === email); // Busca el alumno con el email correspondiente
  if (alumnoRepetido) {
    next({
      codigo: 400,
      message: `Ya existe un alumno con el email: '${email}'`,
    });
  } else {
    next();
  }
}

//validar si el ID es repetido
function validarIDrepetido(req, res, next) {
  const { id } = req.datosAlumno; // Obtener los datos del cuerpo de la solicitud
  const alumnoRepetido = alumnos.find((alumno) => alumno.id === id); // Busca el alumno con el ID correspondiente
  if (alumnoRepetido) {
    next({
      codigo: 400,
      message: `Ya existe un alumno con el ID: '${id}'`,
    });
  } else {
    next();
  }
}

//Paso 3 okMiddlewarePost crear el alumno
function okMiddlewarePost(req, res, next) {
  alumnos.push(req.datosAlumno); // Agrega el alumno a la lista de alumnos
  res.status(201).json(req.datosAlumno); // Devuelve el alumno creado en formato JSON
}

//badRequest middleware
function badRequest(err, req, res, next) {
  res.status(err.codigo);
  res.json({
    message: err.message,
  });
  return new Error("Lo siento hubo un error");
}

// Middlewares para el delete "/alumno/:id"
// Paso 1 Setear el el ID de alumno usa el middleware setearIdAlumno
// Paso 2 Validar que el id sea un numero entero usa el middleware validarIdAlumno
// Paso 3 Obtener el alumno por ID usa el middleware obtenerAlumnoPorId
// Paso 4 Borrar el alumno usa el middleware borrarAlumno
function borrarAlumno(req, res, next) {
  const alumno = req.alumno;
  const index = alumnos.indexOf(alumno);
  alumnos.splice(index, 1);
  next();
}

// Paso 5 okMiddlewareDelete
function okMiddlewareDelete(req, res, next) {
  res.json({
    message: "Alumno eliminado",
    alumno: req.alumno,
  });
}

// Middlewares para el put "/alumno/:id"
// Paso 1 Setear el el ID de alumno usa el middleware setearIdAlumno
// Paso 2 Validar que el id sea un numero entero usa el middleware setearIdAlumno
// Paso 3 Obtener el alumno por ID usa el middleware obtenerAlumnoPorId
// Paso 4 Agregar un curso a un alumno usa el middleware agregarCurso

function agregarCurso(req, res, next) {
  const alumno = req.alumno;
  const index = alumnos.indexOf(alumno);
  alumnos[index].cursos.push(req.body);
  next();
}

// Paso 5 enviar mensaje de operacion exitosa okMiddlewarePut
function okMiddlewarePut(req, res, next) {
  res.json({
    message: "Alumno actualizado",
    alumno: req.alumno,
  });
}

// Paso 6 badRequest middleware usa el middleware badRequest

// Middlewares para el patch "/alumno/:id/curso/:codigo"
// Paso 1 Setear el el ID de alumno usa el middleware setearIdAlumno
// Paso 2 Validar que el id sea un numero entero usa el middleware setearIdAlumno
// Paso 3 Obtener el alumno por ID usa el middleware obtenerAlumnoPorId
// Paso 4 Setear el codigo del curso usa el middleware setearCodigo

function setearCodigoCurso(req, res, next) {
  req.codigoCurso = req.params.codigo;
  next();
}

// Paso 5 Validar que el curso exista en ese alumno usa el middleware validarCurso

function validarCurso(req, res, next) {
  //buscar el codigo del curso en el alumno
  const alumno = req.alumno;
  const codigoCurso = req.codigoCurso;
  const curso = alumno.cursos.find((curso) => curso.codigo === codigoCurso);
  if (!curso) {
    next({
      codigo: 404,
      message: `El alumno no tiene un curso con el código: '${codigoCurso}'`,
    });
  } else {
    next();
  }
}

// Paso 5 Eliminar el curso de un alumno enviado en la ruta usa el middleware eliminarCurso

function eliminarCurso(req, res, next) {
  const alumno = req.alumno;
  const codigoCurso = req.codigoCurso;
  const index = alumno.cursos.findIndex(
    (curso) => curso.codigo === codigoCurso,
  );
  alumno.cursos.splice(index, 1);
  next();
}
// Paso 6 okMiddlewarePatch

function okMiddlewarePatch(req, res, next) {
  res.json({
    message: `Alumno actualizado, se borro el curso con el código: '${req.codigoCurso}'`,
    alumno: req.alumno,
  });
}
// Paso 7 badRequest middleware usa el middleware badRequest

// Rutas
// Lista de alumnos
app.get("/alumno/list", obtenerTodosLosAlumnos);
// Alumno por ID
app.get(
  "/alumno/:id",
  setearIdAlumno,
  validarIdEnRuta,
  obtenerAlumnoPorId,
  okMiddlewareGet,
  badRequest,
);
// Alumno nuevo
app.post(
  "/alumno",
  setearDatosAlumno,
  validarCamposRequeridos,
  validarIdEnBody,
  validarFormatoEmail,
  validarEmailRepetido,
  validarIDrepetido,
  okMiddlewarePost,
  badRequest,
);
// Borrar alumno
app.delete(
  "/alumno/:id",
  setearIdAlumno,
  validarIdEnRuta,
  obtenerAlumnoPorId,
  borrarAlumno,
  okMiddlewareDelete,
  badRequest,
);
// Agrergar un nuevo curso a un alumno
app.put(
  "/alumno/:id/curso",
  setearIdAlumno,
  validarIdEnRuta,
  obtenerAlumnoPorId,
  agregarCurso,
  okMiddlewarePut,
  badRequest,
);
// Quitar curso de un alumno
app.patch(
  "/alumno/:id/curso/:codigo",
  setearIdAlumno,
  setearCodigoCurso,
  validarIdEnRuta,
  obtenerAlumnoPorId,
  validarCurso,
  eliminarCurso,
  okMiddlewarePatch,
  badRequest,
);

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
