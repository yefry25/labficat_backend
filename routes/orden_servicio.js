import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersOrden from '../helpers/orden_servicio.js'
import Ordenes from "../controllers/orden_servicio.js"

const router = new Router()

router.get('/',Ordenes.ordenGet)

router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersOrden.existeOrdenById),
    validarCampos
],Ordenes.ordenActivar)

router.put('/desactivar/:id',[ 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersOrden.existeOrdenById),
    validarCampos
],Ordenes.ordenDesactivar)

router.put('/completado/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersOrden.existeOrdenById),
    validarCampos
],Ordenes.ordenPut)

router.get('/informeDeResultados',Ordenes.informeDeResultados)

export default router