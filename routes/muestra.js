import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersUsuario from "../helpers/usuario.js"
import muestra from "../controllers/muestra.js"

const router = new Router()

router.post('/',[
    check('solicitante').custom(helpersUsuario.existeUsuarioById),
    check('contacto').custom(helpersUsuario.existeUsuarioById),
    check('codMuestra','no puede estar vacio').not().isEmpty(),
    check('munRecoleccion').custom(),
    check('direccionTomaMuestra','no puede estar vacio').not().isEmpty(),
    check('lugarTomaMuestra','no puede estar vacio').not().isEmpty(),
    check('muestraRecolectadaPor','no puede estar vacio').not().isEmpty(),
    check('procedimientoMuestreo','no puede estar vacio').not().isEmpty(),
    check('tipoMuestra').custom(),
    check('matrizMuestra','no puede estar vacio').not().isEmpty(),
    check('fechaRecoleccion').isDate(),
    check('cotizacion').custom(),
    check('item','no puede estar vacio').not().isEmpty(),
    validarCampos
],muestra.muestraPost)

router.get('/',muestra.muestraGet)

router.get('/lugar',[
    check('lugar','no puede estar vacio').not().isEmpty(),
    validarCampos
],muestra.muestraGetLugar)

router.get('/municipio',[
    check('municipio','no puede estar vacio').not().isEmpty(),
    validarCampos
],muestra.muestraGetMunicipio)

router.get('/tipoMuestra',[
    check('tipoMuestra','no puede estar vacio').not().isEmpty(),
],muestra.muestraGetTipo)

router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
],muestra.muestraActivar)

router.put('/desactivar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
],muestra.muestraDesactivar)

export default router