import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersUsuario from "../helpers/usuario.js"
import helpersCiudad from '../helpers/ciudad.js'
import helpersTipoMuestra from '../helpers/tipo_muestra.js'
import helpersCotizacion from '../helpers/cotizacion.js'
import muestra from "../controllers/muestra.js"

const router = new Router()

router.post('/',[
    check('solicitante').custom(helpersUsuario.existeUsuarioById),
    check('munRecoleccion').custom(helpersCiudad.existeMunicipioById),
    check('direccionTomaMuestra','no puede estar vacio').not().isEmpty(),
    check('lugarTomaMuestra','no puede estar vacio').not().isEmpty(),
    check('muestraRecolectadaPor','no puede estar vacio').not().isEmpty(),
    check('procedimientoMuestreo','no puede estar vacio').not().isEmpty(),
    check('tipoMuestra').custom(helpersTipoMuestra.existeTipoMuestraId),
    check('matrizMuestra','no puede estar vacio').not().isEmpty(),
    check('fechaRecoleccion').isDate(),
    check('cotizacion').custom(helpersCotizacion.existeCotizacion),
    check('item','no puede estar vacio').not().isEmpty(),
    validarCampos
],muestra.muestraPost)

router.get('/',muestra.muestraGet)

router.get('/lismamu',muestra.muestraGetLisMaMu)

router.get('/solsegrec',muestra.solsegrec)

router.put('/:id',[
    check('id').isMongoId(),
    check('id').custom(helpersMuestra.existeMuestraById),
    validarCampos
],muestra.muestraPut)

router.put('/activar/:id',[
    check('id').isMongoId(),
    check('id').custom(helpersMuestra.existeMuestraById),
    validarCampos
],muestra.muestraActivar)

router.put('/desactivar/:id',[
    check('id').isMongoId(),
    check('id').custom(helpersMuestra.existeMuestraById),
    validarCampos
],muestra.muestraDesactivar)

export default router