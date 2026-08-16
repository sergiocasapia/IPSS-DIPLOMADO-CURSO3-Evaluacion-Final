import { Curso } from '../models/curso.model.js'

// ---------------------------------------------------------------------------
// SERVICE — cursos. Habla con la base de datos.
// Las REGLAS DE NEGOCIO (validar estado, propiedad, etc.) pueden ir aquí o en
// el controller: tú decides, pero que estén en el servidor, no en el cliente.
// ---------------------------------------------------------------------------

// TODO: implementa las funciones que tus controllers necesiten. Por ejemplo:

//  ── Profesor ──

//5.-   - listarCursos()            → Curso.find().populate('profesor').populate('alumnos')
export const listarCursos = () => {
  return Curso.find()
    .populate('profesor', 'nombre')
    .populate('alumnos', 'nombre')
}

//6.-   - crearCurso(datos)
//export const crearCurso = (datos) => Curso.create(datos)
export const crearCurso = async (datos) => {
  const duplicado = await Curso.findOne({ nombre: datos.nombre })
  if (duplicado !== null ) return 'DUPLICADO'
  return await Curso.create(datos)
}

//7.-   - buscarCurso(id)
export const buscarCurso = (id) => {
  return Curso.find(id)
  .populate('profesor', 'nombre')
  .populate('alumnos', 'nombre')
}

//8.-   - editarCurso(id, datos)
export const editarCurso = (id, datos) => {
  return Curso.findByIdAndUpdate(id, datos, {
    returnDocument: 'after',
    runValidators: true
  })
}

//9.-   - borrarCurso(id)
export const borrarCurso = (id) => {
  return Curso.findByIdAndDelete(id)
}

//10.-   - cursosDelProfesor(profesorId)
export const buscarCursos = (id) => {
  return Curso.findById(id)
}
export const cursosDelProfesor = async (cursoAsignado,id) => {
    cursoAsignado.profesor = id
    return  await cursoAsignado.save()
}

//11.-   - cursosDelAlumno(alumnoId)
export const cursosDelAlumno = (id) => {
  return Curso.findById(id)
    .populate('alumnos', 'nombre')
}

//12.-   - cerrarCurso(id, datos)
export const cerrarCurso = (id) => {
  return Curso.findByIdAndUpdate(id, 
    { estado: 'CERRADO' },
    {
    returnDocument: 'after',
    runValidators: true
  })
}

// Piensa qué necesita cada ruta y crea solo lo que uses.

//  ── Alumno ──

//13.- misMatriculas
export const misMatriculas = (id) => {
  return Curso.find(id)
}

//14.- matricularme
export const matricularme = async (cursoAlumno, idAlumno) => {
  const duplicado =  cursoAlumno.alumnos.some(alumnoId => alumnoId.equals(idAlumno))
  if (duplicado) return 'DUPLICADO'
  cursoAlumno.alumnos.push(idAlumno)
  await cursoAlumno.save()
  return cursoAlumno
}


//15.- desmatricularme
export const desmatricularme = async (cursoAlumno, idAlumno) => {
  const noexisteAlumno =  cursoAlumno.alumnos.some(alumnoId => alumnoId.equals(idAlumno))
  if (!noexisteAlumno) return 'NOEXISTE'
  cursoAlumno.alumnos.pull(idAlumno)
  await cursoAlumno.save() 
  return cursoAlumno
}
