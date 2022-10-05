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
    check('direccionTomaMuestra','direccion de toma de muestra no puede estar vacio').not().isEmpty(),
    check('lugarTomaMuestra','lugar de toma de muestra no puede estar vacio').not().isEmpty(),
    check('muestraRecolectadaPor',' recolectador no puede estar vacio').not().isEmpty(),
    check('procedimientoMuestreo','procedimiento de muestreo no puede estar vacio').not().isEmpty(),
    check('tipoMuestra').custom(helpersTipoMuestra.existeTipoMuestraId),
    check('matrizMuestra','matriz no puede estar vacio').not().isEmpty(),
    check('fechaRecoleccion','fecha de recoleccion debe ser tipo date').isDate(),
    check('cotizacion').custom(helpersCotizacion.existeCotizacion),
    check('item','item no puede estar vacio').not().isEmpty(),
    validarCampos
],muestra.muestraPost)

router.get('/',muestra.muestraGet)

router.get('/lismamu',muestra.muestraGetLisMaMu)

router.get('/solsegrec',muestra.solsegrec)

router.put('/:id',[
    check('id','el id de lam uestra debe ser uno válido').isMongoId(),
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