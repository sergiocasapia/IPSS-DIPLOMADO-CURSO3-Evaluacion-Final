### Proyecto final del módulo: construye el backend de una plataforma de cursos con Node.js, Express y MongoDB
Modulo 3 -Backend y API REST IPSS

### Nombre del grupo
EVALUACION 2 DIPLOMADOS IPSS

### Integrantes
Sergio Casapia Churata

### Descripción
Profesores que dictan cursos, alumnos que se matriculan, y las reglas de negocio que
los conectan. Es una API REST completa — con base de datos, autenticación por rol
(JWT + bcrypt) y relaciones entre entidades.

### Deploy
Sitio desplegado: N/A

### Capturas del sitio
N/A

### Cómo correr localmente
git clone : https://github.com/sergiocasapia/IPSS-DIPLOMADO-CURSO3-Evaluacion-Final.git. 
VSC ir a terminal de ruta de proyecto clonado y ejecutar : npm install. 
Duplicar archivo marcado .env.example a .env (configurar las variables). 
Levanta API REST : node server.js (deja corriendo : http://localhost:3000). 
Levantar PostMan y importar archivo : PlataformaCursos.postman_collection.json  


### Endpoinst (Rutas API)
Metodo HTTP (GET , POST, PUT, DELETE) 

### Detalle Metodos (Testing)
| ID Caso | Modulo     | Descripcion                                           | PostMan                       | Metodo | Cod. Real | Estado (Pasa/Falla) | Observaciones                                                                      | Validaciones                                                                                                              |
|---------|------------|-------------------------------------------------------|-------------------------------|--------|-----------|---------------------|------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| API-001 | Usuarios   | Saludos                                               | 1-GET_Saludo                  | GET    | 200       | ? Exito             | Valida Servicio Api Operativo                                                      | - Entrega Saludos                                                                                                         |
| API-002 | Usuarios   | Crear Profesor con datos validos                      | 2-POST_Profesor               | POST   | 201       | ? Exito             | Validar creacion en BD                                                             | - Se valida password Hash BD - Se valida Generacion Token - Se valida no muestra password - Error : 400 Duplicidad email  |
| API-003 | Usuarios   | Crear Alumnos con datos validos                       | 3-POST_Alumno                 | POST   | 201       | ? Exito             | Validar creacion en BD                                                             | - Se valida password Hash BD - Se valida Generacion Token - Se valida no muestra password - Error : 400 Duplicidad email  |
| API-004 | Usuarios   | Login Profesores / Alumnos                            | 4-POST_Login                  | POST   | 201       | ? Exito             | Valida Firma Token                                                                 | - Error : 401 Credencial invalida (Profesor/Alumno)                                                                       |
| API-006 | Profesores | Crear Curso sin Profesor y 2 Alumnos                  | 6-POST_Curso                  | POST   | 201       | ? Exito             | Valida firma Token, Crea Curso sin profesor y 2 Alumnos                            | - Error : 409 Curso ya Existe                                                                                             |
| API-005 | Profesores | Consulta los Cursos                                   | 5-GET_Listar_Cursos           | GET    | 200       | ? Exito             | Valida firma Token y entrega todos los cursos que existen con profesores y alumnos | - Error : 404 Curso no Existe                                                                                             |
| API-008 | Profesores | Editar un curso                                       | 8-PUT_Curso                   | PUT    | 200       | ? Exito             | Valida firma Token y entrega el curso buscado                                      | - Error : 404 Curso no Existe                                                                                             |
| API-009 | Profesores | Borrar un Curso                                       | 9-DELETE_Curso                | DELETE | 200       | ? Exito             | Valida firma Token y purga de curso                                                | - Error : 404 Curso no Existe                                                                                             |
| API-010 | Profesores | Asigna Curso Profesor autentico Session               | 10-POST_Asigna_Curso_Profesor | POST   | 201       | ? Exito             | Valida firma Token y purga de curso                                                | - Error : 404 Curso no Existe - Error : 409 Curso Cerrado - Error : 409 Curso ya Asignado                                 |
| API-007 | Profesores | Buscar Curso de dicta proferos que autentico session  | 7-GET_Cursos_Profesor         | GET    | 200       | ? Exito             | Valida firma Token y muestra Cursos del profesor con sus alumnos                   | - Error : 404 Curso no Existe                                                                                             |
| API-011 | Profesores | Buscar Curso de dicta proferos que autentico session  | 11-GET_Buscar_Curso           | GET    | 200       | ? Exito             | Valida firma Token y muestra el Curso                                              | - Error : 404 Curso no Existe - Error : 409 Curso No Asignado - Error : 403 ID Profesor es distinto a ID Session Profesor |
| API-012 | Profesores | Terminar un curso                                     | 12-PUT_Cerrar_Curso           | PUT    | 200       | ? Exito             | Valida firma Token y cierra curso.                                                 | - Error : 404 Curso no Existe                                                                                             |
| API-013 | Alumnos    | Curso donde esta Matriculado alumno session           | 13-GET_Cursos_Alumno          | GET    | 200       | ? Exito             | Valida firma Token y entrega sus cursos                                            | - Error : 404 No Matriculado                                                                                              |
| API-014 | Alumnos    | Alumno de sesion  se matricula solo                   | 14-POST_Alumno_Matricula      | POST   | 201       | ? Exito             | Valida firma Token y logra matricularse solo                                       | - Error : 404 Curso no Existe - Error : 409 Curso Cerrado - Error : 409 Ya esta Matriculado                               |
| API-015 | Alumnos    | Alumno de sesion  se sale de curso                    | 15-DELETE_Alumno              | DELETE | 200       | ? Exito             | Valida firma Token y logra salir de curso                                          | - Error : 404 Curso no Existe - Error : 409 Curso Cerrado                                                                 |


### Estado API REST
Retorno : 200 al leer bien, 201 al crear, 400 si los datos que llegan están mal o faltan, 404 si el recurso no existe. 401 credenciales invalidas, 409 conflicto datos y 403 id distinto a usuario session.

### Glosario Tecnico aplicado
Autenticación y Seguridad. 
JWT: Token compacto para transmitir identidad de forma segura.  
bcrypt: Librería para encriptar contraseñas en la base de datos.  
hash: Cadena de texto irreversible generada al encriptar una clave.  
token: Credencial temporal que autoriza el acceso a rutas protegidas.  
Consultas y Persistencia (Mongoose). 
toJSON: Limpia el objeto eliminando datos sensibles (como la contraseña) antes de enviarlo.  
find: Busca todos los documentos que coincidan con un criterio.  
findOne: Devuelve el primer documento que cumpla la condición.  
findById: Busca un único documento utilizando directamente su ID único.  
findByIdAndUpdate: Modifica un registro específico por su ID en una sola operación.  
findByIdAndDelete: Elimina de forma permanente un registro mediante su ID.  
populate: Reemplaza los IDs de referencia con los datos reales de otra colección.  
save: Guarda los cambios locales del documento directamente en la base de datos.  
Operaciones en Arreglos. 
push: Añade un nuevo elemento al final de un arreglo del documento.  
pull: Elimina todas las apariciones de un valor específico dentro de un arreglo.  
