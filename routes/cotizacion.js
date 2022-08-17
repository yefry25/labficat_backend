import { Router } from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersUsuario from "../helpers/usuario.js"
import cotizacion from "../controllers/cotizacion.js"

const router = new Router();

router.post('/',[
    check('numCotizacion','no puede estar vacio').not().isEmpty(),
    check('fechaEmision','solo formato fecha').isDate(),
    check('idCliente').custom(helpersUsuario.existeUsuarioById),
    check('idContacto').custom(helpersUsuario.existeUsuarioById),
    check('validezOferta').isDate(),
    check('validezOferta','el campo no puede estar vacio').not().isEmpty(),
    check('entregaResultados').isDate(),
    check('entregaResultados','el campo no puede estar vacio').not().isEmpty(),
    check('idElaboradoPor').custom(helpersUsuario.existeUsuarioById),
    check('items').custom(),
    check('subTotal','el campo no puede estar vacio').not().isEmpty(),
    check('descuento','el campo no puede estar vacio').not().isEmpty(),
    check('iva','el campo no puede estar vacio').not().isEmpty(),
    check('total','el campo no puede estar vacio').not().isEmpty(),
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

export default router

