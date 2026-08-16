import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRA } from '../config/jwt.js'
import { Profesor } from '../models/profesor.model.js'
import { Alumno } from '../models/alumno.model.js'

// ---------------------------------------------------------------------------
// SERVICE — autenticación. Habla con la base de datos y con bcrypt/jwt.
// El controller no toca la base directamente: llama a estas funciones.
// ---------------------------------------------------------------------------

// Firma un token con el id y el rol. Úsalo al registrar y al hacer login.
export const firmarToken = (id, rol) =>
  jwt.sign({ id, rol }, JWT_SECRET, { expiresIn: JWT_EXPIRA })

// TODO: registra un profesor.
//   - hashea la password con bcrypt (bcrypt.hash(password, 10))
//   - créalo en la base
//   - devuelve { token, profesor } (sin la password)
export const registrarProfesor = async (datos) => {
  //Aplicar bcrypt
  //Saltos
  const saltos = await bcrypt.genSalt(10);
  //Hash
  datos.password = await bcrypt.hash(datos.password, saltos);
  const profesor = await Profesor.create(datos)
  //toJSON de Mongo, para delete password en retorno
  const profesorSinPass = profesor.toJSON()
  delete profesorSinPass.password
  const token = firmarToken(profesor._id, 'profesor')
  return { profesor:profesorSinPass, token}
  //return { profesor:profesorSinPass, token: null}
}

// TODO: registra un alumno (igual que el profesor).
export const registrarAlumno = async (datos) => {
  //Aplicar bcrypt
  //Saltos
  const saltos = await bcrypt.genSalt(10);
  //Hash
  datos.password = await bcrypt.hash(datos.password, saltos);
  const alumno = await Alumno.create(datos)
  //toJSON de Mongo, para delete password en retorno
  const alumnoSinPass = alumno.toJSON()
  delete alumnoSinPass.password
  const token = firmarToken(alumno._id, 'alumno')
  return { alumno:alumnoSinPass, token}
  //return { alumno:alumnoSinPass, token: null}
}

// TODO: login.
//   - busca al usuario por email (en Profesor y en Alumno)
//   - compara la password con bcrypt.compare(...)
//   - si coincide, devuelve { token, rol } con el rol correcto
//   - si no, devuelve null (para que el controller responda 401)
export const login = async (email, password) => {
  const profesor = await Profesor.findOne({ email })
  const alumno = await Alumno.findOne({ email })
  //if (!profesor) return null
  //return { profesor, token: null }
  if (!profesor && !alumno) {
    return null
  } else if (profesor) {
          //compara bcrypt
          const coincide = await profesor.compararPassword(password)
         if (!coincide) return null
          //toJSON de Mongo, para delete password en retorno
          const profesorSinPass = profesor.toJSON()
          delete profesorSinPass.password
          const token = firmarToken(profesor._id, 'profesor')
          return { profesor:profesorSinPass, token }
          //return { profesor:profesorSinPass, token: null }
  } else {
          //compara bcrypt
          const coincide = await alumno.compararPassword(password)
         if (!coincide) return null
         //toJSON de Mongo, para delete password en retorno
         const alumnoSinPass = alumno.toJSON()
         delete alumnoSinPass.password
         const token = firmarToken(alumno._id, 'alumno')
         return { alumno:alumnoSinPass, token}
         //return { alumno:alumnoSinPass, token: null }
  }

}