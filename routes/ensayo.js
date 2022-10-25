import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import ensayo from '../controllers/ensayo.js'
import helpersUsuario from '../helpers/usuario.js'
import helpersEnsayo from '../helpers/ensayo.js'
import validar from '../middlewares/validar.js'

const router = new Router()

router.get('/',ensayo.ensayoGet)

router.post('/',[
    validar.validarJWT,
    check('ensayo').custom(helpersEnsayo.existeEnsayoByNombre),
    check('ensayo','el campo ensayo no puede estar vacio').not().isEmpty(),
    check('metodo','el metodo no puede estar vacio').not().isEmpty(),
    check('tecnica','la tecnica no puede estar vacio').not().isEmpty(),
    check('costo','el costo no puede estar vacio').not().isEmpty(),
    check('descripcion','descripcion no puede estar vacio').not().isEmpty(),
    check('limiteCuantificacion','limite de cuantificacion no puede estar vacio').not().isEmpty(),
    check('responsables').custom(helpersUsuario.existeResponsables),
    validarCampos
],ensayo.ensayoPost)

router.put('/:id', [
    validar.validarJWT,
    check("id",'El id del ensayo no es válido').isMongoId(),
    check('id').custom(helpersEnsayo.existeEnsayoById),
    validarCampos //para que funcione los check debe haber el validarCampos para que capture los errores y los muestre
],ensayo.ensayoPut)

router.put('/activar/:id',[
    validar.validarJWT,
    check("id",'El id del ensayo no es válido').isMongoId(),
    check('id').custom(helpersEnsayo.existeEnsayoById),
    validarCampos
],ensayo.ensayoActivar)

router.put('/desactivar/:id',[
    validar.validarJWT,
    check("id",'El id del ensayo no es válido').isMongoId(),
    check('id').custom(helpersEnsayo.existeEnsayoById),
    validarCampos
],ensayo.ensayoDesactivar)

export default router