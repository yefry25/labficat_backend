import {Router} from "express"
import { validarCampos } from "../middlewares/middleware.js"
import { check } from "express-validator"
import helpersUsuario from "../helpers/usuario.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersOferta from "../helpers/oferta_servicio.js"
import helpersRecepcion from "../helpers/recepcion_muestra.js"
import RecepcionMuestra from "../controllers/recepcion_muestra.js"

const router = new Router()

router.post('/',[
    check('idCliente').not().isEmpty(),
    check('idCliente').custom(helpersUsuario.existeUsuarioById),
    check('datoMuestra').not().isEmpty(),
    check('datoMuestra').custom(helpersMuestra.existeMuestraRecepcion),
    check('datoMuestra').custom(helpersOferta.existeCotizacion),
    check('quienEntreMuestras').custom(helpersUsuario.existeUsuarioById),
    check('fechaRecepMuestras').not().isEmpty(),
    check('recibeMuestras').custom(helpersUsuario.existeUsuarioById),
    validarCampos
],RecepcionMuestra.recepcionPost)

router.get('/',RecepcionMuestra.recepcionGet)

router.get('/fecha',[
    check('fechaRecepMuestras').not().isEmpty(),
    validarCampos
],RecepcionMuestra.recepcionGetFechaRecepcion)

router.put('/modificar/:id',[
    check('id').custom(helpersRecepcion.existeRecepcionById),
    check('fechaRecepMuestras').not().isEmpty(),
    validarCampos
],RecepcionMuestra.recepcionPut)

export default router