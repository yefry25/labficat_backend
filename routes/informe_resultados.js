import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import resultado from "../controllers/informe_resultados.js"
import helpersUsuario from "../helpers/usuario.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersResultado from "../helpers/informe_resultado.js"

const router = new Router()

router.post('/',[
    check('informeResulNumero','no puede estar vacio').not().isEmpty(),
    check('fechaRecepMuestra','no puede estar vacio').not().isEmpty(),
    check('fechaEmisionInforme','no puede estar vacio').not().isEmpty(),
    check('idCliente').custom(helpersUsuario.existeUsuarioById),
    check('idMuestra').custom(helpersMuestra.existeMuestraById),
    check('analisisMuestra','no puede estar vacio').not().isEmpty(),
    validarCampos
],resultado.resultadoPost)

router.get('/fechaEmi',[
    check('fechaEmisionInforme','no puede estar vacio').not().isEmpty(),
    validarCampos 
],resultado.resultadoGetFechaEmi)

export default router