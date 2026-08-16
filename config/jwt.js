// ---------------------------------------------------------------------------
// CONFIG — el secreto para firmar y verificar los JWT.
// ---------------------------------------------------------------------------
// En un proyecto real esto va en una variable de entorno. Para la evaluación,
// puedes dejarlo aquí — pero cámbialo por una cadena tuya, larga y aleatoria.

//export const JWT_SECRET = 'cambia-esto-por-un-secreto-largo-y-aleatorio'
export const JWT_SECRET = process.env.JWT_SECRET

// Cuánto dura la sesión.
//export const JWT_EXPIRA = '7d'
export const JWT_EXPIRA = process.env.JWT_EXPIRA
