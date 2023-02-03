import { Router } from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import usuario from "../controllers/usuario.js"
import helpersUsuario from "../helpers/usuario.js"
import helpersCiudad from '../helpers/ciudad.js'
import validar from '../middlewares/validar.js'
import validarArchivo from "../middlewares/validar-archivo.js"

const router = new Router()

router.post('/', [
    validar.validarJWT,
    check('tipoPersona', 'no puede estar vacio').not().isEmpty(),
    check('nombre', 'no puede estar vacio').not().isEmpty(),
    check('documento', 'no puede estar vacio').not().isEmpty(),
    check('documento').custom(helpersUsuario.existeDocumento),
    check('direccion', 'no puede estar vacio').not().isEmpty(),
    check('ciudad').custom(helpersCiudad.existeCiudadById),
    check('ciudad', 'id debe ser válido').isMongoId(),
    check('telefono', 'no puede estar vacio').not().isEmpty(),
    check('telefono', 'maximo 14 caracteres').isLength({ max: 14 }),
    check('correo', 'solo formato email').isEmail(),
    check('correo', 'ya existe un cliente registrado con este correo').custom(helpersUsuario.existeEmail),
    check('rol', 'no puede estar vacio').not().isEmpty(),
    validarCampos
], usuario.usuarioPost)

router.post('/login', [
    check('correo', 'el campo correo no puede estar vacio').not().isEmpty(),
    check('correo', 'solo formato email').isEmail(),
    check('password', 'el campo password no puede estar vacio').not().isEmpty(),
    check('password', 'la contraseña no puede tener menos de 8 caracteres').isLength({ min: 8 }),
    validarCampos,
], usuario.usuarioLogin)

router.get('/', usuario.usuarioGet)

router.post('/documento', [
    check('documento', 'este campo no puede estar vacio documento').not().isEmpty(),
    validarCampos
], usuario.usuarioGetDocumento)

router.post('/email', [
    check('email', 'El campo email no puede estar vacio').not().isEmpty(),

    validarCampos
], usuario.usuarioGetEmail)

router.post('/nombre', [
    check('nombre', 'no puede estar vacio el campo nombre').not().isEmpty(),
    validarCampos
], usuario.usuarioGetNombre)

router.post('/roles', [
    check('rol', 'no puede estar vacio el campo rol').not().isEmpty(),
    validarCampos
], usuario.usuarioGetRoles)

router.put('/activar/:id', [
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
    validarCampos
], usuario.personaActivar)

router.put('/desactivar/:id', [
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
    validarCampos
], usuario.personaDesactivar)

router.put('/vacaciones/:id', [
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
    validarCampos
], usuario.personaVacaciones)

router.put('/modificar/:id', [
    validar.validarJWT,
    check('id', 'el id debe ser válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
    validarCampos
], usuario.usuarioPut)

router.put('/modificar/password/:id', [
    validar.validarJWT,
    check('id', 'el id debe ser válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
    validarCampos
], usuario.usuarioPutCambiarPassword)

router.post('/uploadinary/:id', [
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
    validarArchivo,
    validarCampos
], usuario.cargarArchivoCloud)

/* recuperar contraseña */
router.put('/recuperarPassword', [
    check('correo', 'El campo correo no puede estar vacio').not().isEmpty(),
    check('correo').custom(helpersUsuario.existeEmailChangePassword),
    validarCampos
], usuario.recuperarPassword)

/* ruta para cambiar la contraseña */

router.put('/nuevaPassword', [
    validar.validarResetJWT,
    check('nuevaPassword', 'No puede estar vacio el campo nueva contraseña').not().isEmpty(),
    validarCampos
], usuario.crearNuevaPassword)

export default router