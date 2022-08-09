import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersOrden from "../helpers/orden_servicio.js"
import helpersUsuario from "../helpers/usuario.js"
import Ordenes from "../controllers/orden_servicio.js"

const router = new Router()

router.post('/',[
    check('fechaIngrMuestra','No puede estar vacio').not().isEmpty(),
    check('idMuestra').custom(helpersMuestra.existeMuestra),
    check('parametroTecMetodo','No puede estar vacio').not().isEmpty(),
    check('estadoMuestra','no puede estar vacio').not().isEmpty(),
    check('realizadoPor',).custom(helpersUsuario.existeUsuarioById),
    check('supervisadoPor',).custom(helpersUsuario.existeUsuarioById),
    check('supervisadoPor','no puede estar vacio').not().isEmpty(),
    check('observaciones','no puede estar vacio').not().isEmpty(),
    validarCampos
],Ordenes.ordenPost)

router.get('/',Ordenes.ordenGet)

router.get('/fecha',[
    check('fechaIngrMuestra','no puede estra vacio').not().isEmpty(),
    validarCampos
],Ordenes.listarFecha)

router.get('/parametro',[
    check('parametroTecMetodo','no puede estar vacio').not().isEmpty(),
    validarCampos
],Ordenes.ordenGetParametro)

router.get('/estado',[
    check('estadoMuestra','no puede estar vacio').not().isEmpty(),
    validarCampos
],Ordenes.ordenGetEstado)

router.get('/realizado',[
    check('realizadoPor','no puede estar vacio').not().isEmpty(),
    validarCampos
],Ordenes.ordenGetRealizado)

router.get('/supervisado',[
    check('supervisadoPor','no puede estar vacio').not().isEmpty(),
    validarCampos
],Ordenes.ordenGetSupervisado)

router.put('/modificar/:id',[
    check('id').custom(helpersOrden.existeOrdenById),
    check('fechaIngrMuestra','No puede estar vacio').not().isEmpty(),
    check('parametroTecMetodo','No puede estar vacio').not().isEmpty(),
    check('estadoMuestra','no puede estar vacio').not().isEmpty(),
    check('supervisadoPor','no puede estar vacio').not().isEmpty(),
    check('observaciones','no puede estar vacio').not().isEmpty(),
    validarCampos
],Ordenes.ordenPut)

export default router