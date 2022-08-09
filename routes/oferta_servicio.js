import {Router} from "express"
import { validarCampos } from "../middlewares/middleware.js"
import { check } from "express-validator"
import helpersUsuario from "../helpers/usuario.js"
import helpersOferta from "../helpers/oferta_servicio.js"
import servicios from "../controllers/oferta_servicio.js"

const router = new Router()

router.post('/',[
    check('numCotizacion','no puede estar vacio').not().isEmpty(),
    check('fechaEmision','no puede estar vacio').not().isEmpty(),
    check('idCliente').custom(helpersUsuario.existeUsuarioById),
    check('idContacto').custom(helpersUsuario.existeUsuarioById),
    check('idElaboradoPor').custom(helpersUsuario.existeUsuarioById),
    check('item','no puede estar vacio').not().isEmpty(),
    check('subTotal','no puede estar vacio').not().isEmpty(),
    check('iva','no puede estar vacio').not().isEmpty(),
    check('total','no puede estar vacio').not().isEmpty(),
    check('idClienteAceptaCondiciones').custom(helpersUsuario.existeUsuarioById),
    validarCampos
],servicios.servicioPost)

router.get('/',servicios.servicioGet)

router.get('/cotizacion',[
    check('numCotizacion','no puede estar vacio').not().isEmpty(),
    validarCampos
],servicios.listarCotizacion)

router.get('/fecha',[
    check('fechaEmision','no puede estar vacio').not().isEmpty(),
    validarCampos
],servicios.servicioGetFechaEmision)

router.get('/codigoRef',[
    check('codigoReferencia','no puede estar vacio').not().isEmpty(),
    validarCampos
],servicios.servicioGetCodReferencia)

router.get('/tecnica',[
    check('tecnica','no puede estar vacio').not().isEmpty(),
    validarCampos
],servicios.servicioGetTecAnalitica)

router.get('/metodo',[
    check('metodo','no puede estar vacio').not().isEmpty(),
    validarCampos
],servicios.servicioGetMetAnalitico)

router.put('/modificar/:id',[
    check('id','no puede estar vacio').not().isEmpty(),
    check('id').custom(helpersOferta.existeOfertaById),
    check('numCotizacion','no puede estar vacio').not().isEmpty(),
    check('fechaEmision','no puede estar vacio').not().isEmpty(),
    check('item','no puede estar vacio').not().isEmpty(),
    check('subTotal','no puede estar vacio').not().isEmpty(),
    check('iva','no puede estar vacio').not().isEmpty(),
    check('total','no puede estar vacio').not().isEmpty(),
    validarCampos
],servicios.putOfertaServicio)

export default router
