import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import resultado from "../controllers/informe_resultados.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersEnsayo from "../helpers/ensayo.js"
import helpersResultado from '../helpers/informe_resultado.js'

const router = new Router()

router.post('/',[
    check('idMuestra').custom(helpersMuestra.existeMuestraById),
    check('fechaEmisionInforme','fecha emision no puede estar vacio').not().isEmpty(),
    check('analisisMuestra').custom(helpersEnsayo.existeAnalisisMuestra),
    validarCampos
],resultado.resultadoPost)

router.get('/fechaEmi',[
    check('fechaEmisionInforme','fecha emision no puede estar vacio').not().isEmpty(),
    validarCampos 
],resultado.resultadoGetFechaEmi)

router.get('/',resultado.resultadoGet)

router.put('/:id',[
    check('id').custom(helpersResultado.existeResultadoById),
    validarCampos
],resultado.resultadoPut)

export default router