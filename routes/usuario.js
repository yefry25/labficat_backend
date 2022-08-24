import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import usuario from "../controllers/usuario.js"
import helpersUsuario from "../helpers/usuario.js"
import helpersCiudad from '../helpers/ciudad.js'

const router=new Router()

router.post('/',[
    check('tipoPersona','no puede estar vacio').not().isEmpty(),
    check('nombre','no puede estar vacio').not().isEmpty(),
    check('documento','no puede estar vacio').not().isEmpty(),
    check('direccion','no puede estar vacio').not().isEmpty(),
    check('ciudad').custom(helpersCiudad.existeCiudadById),
    check('telefono','no puede estar vacio').not().isEmpty(),
    check('telefono','maximo 14 caracteres').isLength({max:14}),
    check('correo','solo formato email').isEmail(),
    check('correo','ya existe un cliente registrado con este correo').custom(helpersUsuario.existeEmail),
    check('rol','no puede estar vacio').not().isEmpty(),
    validarCampos
],usuario.usuarioPost)

router.get('/',usuario.usuarioGet)

router.get('/documento',[
    check('documento','este campo no puede estar vacio').not().isEmpty(),
    validarCampos
],usuario.usuarioGetDocumento)

router.get('/nombre',[
    check('nombre','no puede estar vacio').not().isEmpty(),
    validarCampos
],usuario.usuarioGetNombre)

router.get('/roles',[
    check('rol','no puede estar vacio').not().isEmpty(),
    validarCampos
],usuario.usuarioGetRoles)

router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
],usuario.personaActivar)

router.put('/desactivar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
],usuario.personaDesactivar)

export default router