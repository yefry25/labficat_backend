import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersOrden from "../helpers/orden_servicio.js"
import helpersUsuario from "../helpers/usuario.js"
import helpersEnsayo from '../helpers/ensayo.js'
import Ordenes from "../controllers/orden_servicio.js"

const router = new Router()

router.post('/',[
    check('idMuestra').custom(helpersMuestra.existeMuestra),
    check('ensayo').custom(helpersEnsayo.existeEnsayoById),
    check('realizadoPor',).custom(helpersUsuario.existeUsuarioById),
    check('supervisadoPor',).custom(helpersUsuario.existeUsuarioById),
    check('observaciones','no puede estar vacio').not().isEmpty(),
    validarCampos
],Ordenes.ordenPost)

router.get('/',Ordenes.ordenGet)

router.get('/realizado',[
    check('realizadoPor',).custom(helpersUsuario.existeUsuarioById),
    validarCampos
],Ordenes.ordenGetRealizado)

router.get('/supervisado',[
    check('supervisadoPor',).custom(helpersUsuario.existeUsuarioById),
    validarCampos
],Ordenes.ordenGetSupervisado)

router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
],Ordenes.ordenActivar)

router.put('/desactivar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
],Ordenes.ordenDesactivar)

export default router