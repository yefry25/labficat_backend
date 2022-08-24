import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import resultado from "../controllers/informe_resultados.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersEnsayo from "../helpers/ensayo.js"

const router = new Router()

router.post('/',[
    check('idMuestra').custom(helpersMuestra.existeMuestraById),
    check('informeResulNumero','no puede estar vacio').not().isEmpty(),
    check('fechaEmisionInforme','no puede estar vacio').not().isEmpty(),
    check('analisisMuestra').custom(helpersEnsayo.existeAnalisisMuestra),
    validarCampos
],resultado.resultadoPost)

router.get('/fechaEmi',[
    check('fechaEmisionInforme','no puede estar vacio').not().isEmpty(),
    validarCampos 
],resultado.resultadoGetFechaEmi)

export default router