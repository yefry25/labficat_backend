import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersUsuario from "../helpers/usuario.js"
import helpersCiudad from '../helpers/ciudad.js'
import helpersTipoMuestra from '../helpers/tipo_muestra.js'
import helpersCotizacion from '../helpers/cotizacion.js'
import muestra from "../controllers/muestra.js"
import validar from '../middlewares/validar.js'

const router = new Router()

router.post('/',[
    validar.validarJWT,
    check('solicitante').custom(helpersUsuario.existeUsuarioById),
    check('munRecoleccion').custom(helpersCiudad.existeMunicipioById),
    check('direccionTomaMuestra','direccion de toma de muestra no puede estar vacio').not().isEmpty(),
    check('lugarTomaMuestra','lugar de toma de muestra no puede estar vacio').not().isEmpty(),
    check('muestraRecolectadaPor',' recolectador no puede estar vacio').not().isEmpty(),
    check('procedimientoMuestreo','procedimiento de muestreo no puede estar vacio').not().isEmpty(),
    check('tipoMuestra').custom(helpersTipoMuestra.existeTipoMuestraId),
    check('matrizMuestra','matriz no puede estar vacio').not().isEmpty(),
    check('fechaRecoleccion','fecha de recoleccion debe ser tipo date').isISO8601().toDate(),
    check('cotizacion').custom(helpersCotizacion.existeCotizacion),
    check('item','item no puede estar vacio').not().isEmpty(),
    validarCampos
],muestra.muestraPost)

router.post('/cliente',[
    check('solicitante','solicitante no puede estar vacio').not().isEmpty(),
    validarCampos
],muestra.muestraGetCliente)

router.get('/',muestra.muestraGet)

router.get('/lismamu',muestra.muestraGetLisMaMu)

router.get('/solsegrec',muestra.solsegrec)

router.post('/factura',[
    check('id', 'El campo id no puede estar vacio').not().isEmpty(),
    validarCampos
], muestra.facturaMuestra)

router.put('/:id',[
    validar.validarJWT,
    check('id','el id de la muestra debe ser uno válido').isMongoId(),
    check('id').custom(helpersMuestra.existeMuestraById),
    validarCampos
],muestra.muestraPut)

router.put('/activar/:id',[
    validar.validarJWT,
    check('id').isMongoId(),
    check('id').custom(helpersMuestra.existeMuestraById),
    validarCampos
],muestra.muestraActivar)

router.put('/desactivar/:id',[
    validar.validarJWT,
    check('id').isMongoId(),
    check('id').custom(helpersMuestra.existeMuestraById),
    validarCampos
],muestra.muestraDesactivar)

export default router