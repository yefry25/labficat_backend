import { Router } from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersUsuario from "../helpers/usuario.js"
import cotizacion from "../controllers/cotizacion.js"
import helpersEnsayo from '../helpers/ensayo.js'

const router = new Router();

router.post('/',[
    check('fechaEmision','solo formato fecha').isDate(),
    check('idCliente').custom(helpersUsuario.existeUsuarioById),
    check('idContacto').custom(helpersUsuario.existeUsuarioById),
    check('validezOferta').isDate(),
    check('validezOferta','el campo no puede estar vacio').not().isEmpty(),
    check('entregaResultados').isDate(),
    check('entregaResultados','el campo no puede estar vacio').not().isEmpty(),
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

router.put('/modificar/:id',cotizacion.cotizacionPut)

export default router

