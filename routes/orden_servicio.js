import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersOrden from '../helpers/orden_servicio.js'
import Ordenes from "../controllers/orden_servicio.js"
import validar from '../middlewares/validar.js'

const router = new Router()

router.get('/',Ordenes.ordenGet)

router.put('/activar/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersOrden.existeOrdenById),
    validarCampos
],Ordenes.ordenActivar)

router.put('/desactivar/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersOrden.existeOrdenById),
    validarCampos
],Ordenes.ordenDesactivar)

router.put('/completado/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersOrden.existeOrdenById),
    validarCampos
],Ordenes.ordenPut)

router.get('/informeDeResultados/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersOrden.existeOrdenById),
    validarCampos
],Ordenes.informeDeResultados)

router.get('/lismamu',Ordenes.lismamu)

router.get('/semaforo',Ordenes.semaforo)

export default router