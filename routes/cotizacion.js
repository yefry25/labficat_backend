import { Router } from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersUsuario from "../helpers/usuario.js"
import cotizacion from "../controllers/cotizacion.js"
import helpersCotizacion from "../helpers/cotizacion.js"
import validar from '../middlewares/validar.js'

const router = new Router();

router.post('/',[
    validar.validarJWT,
    check('fechaEmision','solo formato fecha').isISO8601().toDate(),
    check('idCliente','el id del cliente no es correcto').isMongoId(),
    check('idCliente').custom(helpersUsuario.existeUsuarioById),
    check('validezOferta','el campo digitado debe ser tipo fecha').isISO8601().toDate(),
    check('validezOferta','el campo validez oferta no puede estar vacio').not().isEmpty(),
    check('entregaResultados','el campo digitado debe ser tipo fecha').isISO8601().toDate(),
    check('entregaResultados','el campo entrega de resultados no puede estar vacio').not().isEmpty(),
    check('idElaboradoPor','el id del usuario no es correcto').isMongoId(),  
    check('idElaboradoPor').custom(helpersUsuario.existeUsuarioById) ,
    /* check('items').custom(helpersEnsayo.itemEnsayo), */
    validarCampos
],cotizacion.cotizacionPost)

router.get('/',cotizacion.cotizacionGet)

router.get('/idCotizacion/:id',[
    check('id','el id no es compatible').isMongoId(),
    check('id').custom(helpersCotizacion.existeCotizacion),
    validarCampos
],cotizacion.cotizacionGetIdCotizacion)

router.post('/numCotizacion',[

    check('numCotizacion','el campo numero de cotizacion no puede estar vacio').not().isEmpty(),
    validarCampos
],cotizacion.listarCotizacion)

router.post('/fechaEmision',[
    check('fechaEmision','Fecha emision debe ser de tipo fecha').isISO8601().toDate(),
    validarCampos
],cotizacion.servicioGetFechaEmision)

router.post('/solsegrec',cotizacion.solsegrec) 

router.post('/cliente',[
    check('idCliente','idCliente no puede estar vacio').not().isEmpty(),
    validarCampos
],cotizacion.cotizacionGetCliente)

router.put('/modificar/:id',[
    validar.validarJWT,
    check('id','el id no es compatible').isMongoId(),
    check('id').custom(helpersCotizacion.existeCotizacion),
    validarCampos
],cotizacion.cotizacionPut)

router.put('/aceptar/:id',[
    validar.validarJWT,
    check('id','el id no es compatible').isMongoId(),
    check('id').custom(helpersCotizacion.existeCotizacion),
    validarCampos
],cotizacion.cotizacionAceptada)

router.put('/rechazar/:id',[
    validar.validarJWT,
    check('id','el id no es compatible').isMongoId(),
    check('id').custom(helpersCotizacion.existeCotizacion),
    validarCampos
],cotizacion.cotizacionRechazada)

router.put('/observacion/:id',[
    validar.validarJWT,
    check('id','el id no es compatible').isMongoId(),
    check('id').custom(helpersCotizacion.existeCotizacion),
    check('observacionRechazo','El campo no puede estar vacio').not().isEmpty(),
    validarCampos
],cotizacion.cotizacionObservada)

export default router

