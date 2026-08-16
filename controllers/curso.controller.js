import { Alumno } from '../models/alumno.model.js'
import * as service from '../services/curso.service.js'

// ---------------------------------------------------------------------------
// CONTROLLERS — cursos. Aquí viven las reglas de negocio.
// El id y el rol del usuario que hace la petición vienen en req.usuario
// (lo puso el middleware `proteger` desde el token).
// ---------------------------------------------------------------------------

const NO_ENCONTRADO = { error: 'Curso no encontrado'}
const NO_ASIGNADO = { error: 'Curso no asignado'}
const YA_ASIGNADO = { error: 'Curso ya asignado'}
const DISTINTO_USUARIO_ID = { error: 'Usuario ID Distinto'}
const NO_MATRICULADO = { error: 'Alumno No matriculado'}
const CURSO_CERRADO = { error: 'Curso Cerrado'}
const MATRICULADO = { error: 'Alumno ya matriculado'}
const NO_HAY_CURSOS = { error: 'No hay Cursos'}
const CURSO_EXISTE = { error: 'Curso ya Existe'}

//  ── Profesor ──

//5.- GET /api/cursos — todos los cursos (con populate de profesor y alumnos).
export const listar = async (req, res) => {
  try {
    // TODO: devuelve todos los cursos, con .populate() del profesor y los alumnos.
    const curso = await service.listarCursos()
    //res.json(await service.listarCursos())
    if (curso.length === 0) return res.status(404).json(NO_HAY_CURSOS)
    res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//6.- POST /api/cursos — crea un curso (nace EN_MATRICULA, sin profesor).
export const crear = async (req, res) => {
  try {
    // TODO: crea el curso con los datos del body. Status 201.
    const curso = await service.crearCurso(req.body)
    //console.log(curso)
    if (curso === 'DUPLICADO') return res.status(409).json(CURSO_EXISTE)
    res.status(201).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//7.- GET /api/cursos/mis-cursos — los cursos que dicta ESTE profesor.
export const misCursos = async (req, res) => {
  try {
    // TODO: filtra los cursos por profesor = req.usuario.id.
    const idProfesor = req.usuario.id
    //console.log(idProfesor)
    const curso = await service.buscarCurso({ profesor: idProfesor })
    if (curso.length === 0) return res.status(404).json(NO_ENCONTRADO)
    res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//8.- PUT /api/cursos/:id — edita un curso.
export const editar = async (req, res) => {
  try {
    // TODO: edita el curso. Si no existe → 404.
      const curso = await service.editarCurso(req.params.id,req.body)
      if (!curso) return res.status(404).json(NO_ENCONTRADO)
      res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//9.- DELETE /api/cursos/:id — borra un curso.
export const borrar = async (req, res) => {
  try {
    // TODO: borra el curso. Si no existe → 404.
      const curso = await service.borrarCurso(req.params.id)
      if (!curso) return res.status(404).json(NO_ENCONTRADO)
      res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//10.- POST /api/cursos/:id/asignarme — el profesor se asigna un curso libre.
export const asignarme = async (req, res) => {
  try {
    // TODO — REGLA DE NEGOCIO:
    //   1. Busca el curso. Si no existe → 404.
    //   2. Si YA tiene profesor → 409 (nadie se lo quita a otro).
    //   3. Si está libre → asígnale req.usuario.id como profesor. Guarda.
    const idProfesor = req.usuario.id
    const curso = await service.buscarCursos(req.params.id)
    if (!curso) return res.status(404).json(NO_ENCONTRADO)
    if (curso.estado === 'CERRADO')  return res.status(409).json(CURSO_CERRADO)
    if (curso.profesor) return res.status(409).json(YA_ASIGNADO)
    const cursoAsignado = await service.cursosDelProfesor(curso,idProfesor)
    res.status(201).json(cursoAsignado)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//11.- GET /api/cursos/:id/alumnos — solo el profesor que dicta el curso.
export const alumnosDelCurso = async (req, res) => {
  try {
    // TODO — REGLA DE PROPIEDAD:
    //   1. Busca el curso. Si no existe → 404.
    //   2. Si el profesor del curso NO es req.usuario.id → 403.
    //   3. Devuelve la lista de alumnos (con populate).
    const idProfesor = req.usuario.id
    const curso = await service.buscarCursos(req.params.id)
    if (!curso) return res.status(404).json(NO_ENCONTRADO)
    if (!curso.profesor) return res.status(409).json(NO_ASIGNADO)
    //console.log(curso.id)
    //console.log(curso.profesor)
    //console.log(idProfesor)
    if (!curso.profesor.equals(idProfesor)) return res.status(403).json(DISTINTO_USUARIO_ID)
    res.status(200).json(await service.cursosDelAlumno(curso.id))
    //res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//12.- PUT /api/cursos/:id/cerrar — cerrar un curso.
export const cerrar = async (req, res) => {
  try {
    // TODO: cerrar el curso. Si no existe → 404.
      const curso = await service.cerrarCurso(req.params.id)
      if (!curso) return res.status(404).json(NO_ENCONTRADO)
      if (curso.estado === 'CERRADO')  return res.status(409).json(CURSO_CERRADO)
      res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//  ── Alumno ──

//13.- GET /api/cursos/mis-matriculas — los cursos donde está matriculado ESTE alumno.
export const misMatriculas = async (req, res) => {
  try {
    // TODO: filtra los cursos que tengan a req.usuario.id en su array de alumnos.
    const idAlumno = req.usuario.id
    //console.log(idAlumno)
    const curso = await service.misMatriculas({ alumnos: idAlumno })
    if (curso.length === 0) return res.status(404).json(NO_MATRICULADO)
    res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//14.- POST /api/cursos/:id/matricularme — el alumno se matricula a sí mismo.
export const matricularme = async (req, res) => {
  try {
    // TODO — REGLA DE NEGOCIO:
    //   1. Busca el curso. Si no existe → 404.
    //   2. Si NO está EN_MATRICULA → 409 (curso cerrado).
    //   3. Si el alumno YA está en el curso → 409 (no duplicar).
    //   4. Agrega req.usuario.id al array de alumnos. Guarda.
    const idAlumno = req.usuario.id
    //console.log(idAlumno)
    const curso = await service.buscarCursos(req.params.id)
    if (!curso) return res.status(404).json(NO_ENCONTRADO)
    if (curso.estado === 'CERRADO')  return res.status(409).json(CURSO_CERRADO)
    const respuesta = await service.matricularme(curso, idAlumno)
    if (respuesta === 'DUPLICADO') return res.status(409).json(MATRICULADO)
    res.status(201).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//15.- DELETE /api/cursos/:id/matricularme — el alumno se sale del curso.
export const desmatricularme = async (req, res) => {
  try {
    // TODO:
    //   1. Busca el curso. Si no existe → 404.
    //   2. Si NO está EN_MATRICULA → 409.
    //   3. Quita a req.usuario.id del array de alumnos. Guarda.
    const idAlumno = req.usuario.id
    //console.log(idAlumno)
    const curso = await service.buscarCursos(req.params.id)
    if (!curso) return res.status(404).json(NO_ENCONTRADO)
    if (curso.estado === 'CERRADO')  return res.status(409).json(CURSO_CERRADO)
    const delcurso = await service.desmatricularme(curso,idAlumno)
    if (delcurso === 'NOEXISTE') return res.status(409).json(NO_MATRICULADO)
    res.status(200).json(delcurso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
