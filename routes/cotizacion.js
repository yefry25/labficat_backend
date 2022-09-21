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
    check('idContacto','el id del contacto no es correcto').isMongoId(),
    check('idContacto').custom(helpersUsuario.existeUsuarioById),
    check('validezOferta','el campo digitado debe ser tipo fecha').isDate(),
    check('validezOferta','el campo validez oferta no puede estar vacio').not().isEmpty(),
    check('entregaResultados','el campo digitado debe ser tipo fecha').isDate(),
    check('entregaResultados','el campo entrega de resultados no puede estar vacio').not().isEmpty(),
    check('idElaboradoPor','el id del usuario no es correcto').isMongoId(),  
    check('idElaboradoPor').custom(helpersUsuario.existeUsuarioById) ,
    /* check('items').custom(helpersEnsayo.itemEnsayo), */
    check('descuento','el campo no puede estar vacio').not().isEmpty() ,
    validarCampos
],cotizacion.cotizacionPost)

router.get('/',cotizacion.cotizacionGet)

router.post('/numCotizacion',[
    check('numCotizacion','el campo no puede estar vacio').not().isEmpty(),
    validarCampos
],cotizacion.listarCotizacion)

router.post('/fechaEmision',[
    check('fechaEmision').isDate(),
    validarCampos
],cotizacion.servicioGetFechaEmision)

router.put('/modificar/:id',[
    check('id').custom(helpersCotizacion.existeCotizacion)
],cotizacion.cotizacionPut)

export default router

