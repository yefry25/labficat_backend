import {Router} from 'express'
import {validarCampos} from "../middlewares/middleware.js"
import {check} from "express-validator"
import HelpersSolicitud from "../helpers/solicitud_seguimiento_recepcion.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersOrden from "../helpers/orden_servicio.js"
import helpersUsuario from "../helpers/usuario.js"
import solsegrec from "../controllers/solicitud_seguimiento_recepcion.js"


const router= new Router()

router.get("/",solsegrec.solSegRecGet)

router.post("/",[
    check("fecha","No se puede estar vacio").not().isEmpty(),
    check("cotizacion","No puede estar vacio").not().isEmpty(),
    check("idCliente").custom(helpersUsuario.existeUsuarioById),
    check("idContacto").custom(helpersUsuario.existeUsuarioById),
    check("solicitud","No puede estar vacio").not().isEmpty(),
    check("medioSolicitud","no puede estar vacio").not().isEmpty(),
    check("recibidoPor","No puede estar vacio").not().isEmpty(),
    check("porcentajeAceptacion","No puede estar vacio").not().isEmpty(),
    check("registroAceptacion","no puede estar vacio").not().isEmpty(),
    check("motivoRechazo","no puede estar vacio").not().isEmpty(),
    check("seguimientoCotizacion","No puede estar vacio").not().isEmpty(),
    validarCampos
],solsegrec.solSegRecPost)

export default router





