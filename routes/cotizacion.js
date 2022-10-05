import { Router } from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersUsuario from "../helpers/usuario.js"
import cotizacion from "../controllers/cotizacion.js"
import helpersEnsayo from '../helpers/ensayo.js'
import helpersCotizacion from "../helpers/cotizacion.js"

const router = new Router();

router.post('/',[
    check('fechaEmision','solo formato fecha').isDate(),
    check('idCliente','el id del cliente no es correcto').isMongoId(),
    check('idCliente').custom(helpersUsuario.existeUsuarioById),
    check('validezOferta','el campo digitado debe ser tipo fecha').isDate(),
    check('validezOferta','el campo validez oferta no puede estar vacio').not().isEmpty(),
    check('entregaResultados','el campo digitado debe ser tipo fecha').isDate(),
    check('entregaResultados','el campo entrega de resultados no puede estar vacio').not().isEmpty(),
    check('idElaboradoPor','el id del usuario no es correcto').isMongoId(),  
    check('idElaboradoPor').custom(helpersUsuario.existeUsuarioById) ,
    /* check('items').custom(helpersEnsayo.itemEnsayo), */
    check('descuento','el campo descuento no puede estar vacio').not().isEmpty() ,
    validarCampos
],cotizacion.cotizacionPost)

router.get('/',cotizacion.cotizacionGet)

router.post('/numCotizacion',[
    check('numCotizacion','el campo numero de cotizacion no puede estar vacio').not().isEmpty(),
    validarCampos
],cotizacion.listarCotizacion)

router.post('/fechaEmision',[
    check('fechaEmision','Fecha emision debe ser de tipo fecha').isDate(),
    validarCampos
],cotizacion.servicioGetFechaEmision)

router.post('/cliente',[
    check('idCliente','idCliente no puede estar vacio').not().isEmpty(),
    validarCampos
],cotizacion.cotizacionGetCliente)

router.put('/modificar/:id',[
    check('id').custom(helpersCotizacion.existeCotizacion)
],cotizacion.cotizacionPut)

export default router

