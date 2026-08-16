import { Router } from 'express'
import * as controller from '../controllers/auth.controller.js'

// ---------------------------------------------------------------------------
// RUTAS — autenticación. Todas públicas (no llevan proteger).
// ---------------------------------------------------------------------------
export const authRoutes = Router()

// TODO: conecta cada ruta con su controller.
//2.- registrar profesor
authRoutes.post('/registro/profesor', controller.registrarProfesor)
//3.- registrar alumno
authRoutes.post('/registro/alumno', controller.registrarAlumno)
//4.- login profesor/alumno
authRoutes.post('/login', controller.login)
