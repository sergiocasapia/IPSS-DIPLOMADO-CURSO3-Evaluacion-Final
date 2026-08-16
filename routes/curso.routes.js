import { Router } from 'express'
import * as controller from '../controllers/curso.controller.js'
import { proteger, soloRol } from '../middlewares/proteger.js'

// ---------------------------------------------------------------------------
// RUTAS — cursos. La mayoría van protegidas y con rol.
// Recuerda: todo lo de aquí exige token. Pon `proteger` (y `soloRol` donde
// corresponda) delante del controller.
// ---------------------------------------------------------------------------
export const cursoRoutes = Router()

// TODO: conecta cada ruta. Ejemplos de la forma (ver enunciado para el detalle):

//  ── Profesor ──

//5.-   cursoRoutes.get('/', proteger, soloRol('profesor'), controller.listar)
cursoRoutes.get('/', proteger, soloRol('profesor'), controller.listar)

//6.-   cursoRoutes.post('/', proteger, soloRol('profesor'), controller.crear)
cursoRoutes.post('/', proteger, soloRol('profesor'), controller.crear)

//7.-   cursoRoutes.get('/mis-cursos', proteger, soloRol('profesor'), controller.misCursos)
cursoRoutes.get('/mis-cursos', proteger, soloRol('profesor'), controller.misCursos)

//8.-   cursoRoutes.put('/:id', proteger, soloRol('profesor'), controller.editar)
cursoRoutes.put('/:id', proteger, soloRol('profesor'), controller.editar)

//9.-   cursoRoutes.delete('/:id', proteger, soloRol('profesor'), controller.borrar)
cursoRoutes.delete('/:id', proteger, soloRol('profesor'), controller.borrar)

//10.-   cursoRoutes.post('/:id/asignarme', proteger, soloRol('profesor'), controller.asignarme)
cursoRoutes.post('/:id/asignarme', proteger, soloRol('profesor'), controller.asignarme)

//11.-   cursoRoutes.get('/:id/alumnos', proteger, soloRol('profesor'), controller.alumnosDelCurso)
cursoRoutes.get('/:id/alumnos', proteger, soloRol('profesor'), controller.alumnosDelCurso)

//12.-   cursoRoutes.put('/:id/cerrar', proteger, soloRol('profesor'), controller.editar)
cursoRoutes.put('/:id/cerrar', proteger, soloRol('profesor'), controller.cerrar)

//  ── Alumno ──

//13.-   cursoRoutes.get('/mis-matriculas', proteger, soloRol('alumno'), controller.misMatriculas)
cursoRoutes.get('/mis-matriculas', proteger, soloRol('alumno'), controller.misMatriculas)

//14.-   cursoRoutes.post('/:id/matricularme', proteger, soloRol('alumno'), controller.matricularme)
cursoRoutes.post('/:id/matricularme', proteger, soloRol('alumno'), controller.matricularme)

//15.-   cursoRoutes.delete('/:id/matricularme', proteger, soloRol('alumno'), controller.desmatricularme)
cursoRoutes.delete('/:id/matricularme', proteger, soloRol('alumno'), controller.desmatricularme)
//
// ⚠️ OJO con el orden: las rutas fijas (/mis-cursos) van ANTES que las
//    dinámicas (/:id), o Express interpretará "mis-cursos" como un :id.
