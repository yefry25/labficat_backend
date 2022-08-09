import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import usuario from "../controllers/usuario.js"
import helpersUsuario from "../helpers/usuario.js"

const router=new Router()

router.post('/',[
    check('nombre','no puede estar vacio').not().isEmpty(),
    check('nitOcc','no puede estar vacio').not().isEmpty(),
    check('direccion','no puede estar vacio').not().isEmpty(),
    check('ciudad','no puede estar vacio').not().isEmpty(),
    check('departamento','no puede estar vacio').not().isEmpty(),
    check('contacto','no puede estar vacio').not().isEmpty(),
    check('telefono','no puede estar vacio').not().isEmpty(),
    check('telefono','maximo 14 caracteres').isLength({max:14}),
    check('correo','solo formato email').isEmail(),
    check('correo','ya existe un cliente registrado con este correo').custom(helpersUsuario.existeEmail),
    check('rol','no puede estar vacio').not().isEmpty(),
    validarCampos
],usuario.usuarioPost)

router.get('/',usuario.usuarioGet)

router.get('/nitocc',[
    check('nitOcc','este campo no puede estar vacio').not().isEmpty(),
    validarCampos
],usuario.usuarioGetNitoCC)

router.get('/nombre',[
    check('nombre','no puede estar vacio').not().isEmpty(),
    validarCampos
],usuario.usuarioGetNombre)

router.get('/roles',[
    check('rol','no puede estar vacio').not().isEmpty(),
    validarCampos
],usuario.usuarioGetRoles)

router.put('/modificar/:id',[
    check('id','no puede estar vacio').not().isEmpty(),
    check('id','el id buscado no existe').custom(helpersUsuario.existeUsuarioById),
    check('nombre','no puede estar vacio').not().isEmpty(),
    check('nitOcc','no puede estar vacio').not().isEmpty(),
    check('direccion','no puede estar vacio').not().isEmpty(),
    check('ciudad','no puede estar vacio').not().isEmpty(),
    check('departamento','no puede estar vacio').not().isEmpty(),
    check('contacto','no puede estar vacio').not().isEmpty(),
    check('telefono','no puede estar vacio').not().isEmpty(),
    check('telefono','maximo 14 caracteres').isLength({max:14}),
    check('correo','solo formato email').isEmail(),
    check('correo','ya existe un cliente registrado con este correo').custom(helpersUsuario.existeEmail),
    check('rol','no puede estar vacio').not().isEmpty(),
    validarCampos
],usuario.usuarioPut)

export default router