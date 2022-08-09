import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersMuestra from "../helpers/muestra.js"
import helpersUsuario from "../helpers/usuario.js"
import muestra from "../controllers/muestra.js"

const router = new Router()

router.post('/',[
    check('idCliente').custom(helpersUsuario.existeUsuarioById),
    check('codMuestra','no puede estar vacio').not().isEmpty(),
    check('muniRecoleccion','no puede estar vacio').not().isEmpty(),
    check('direccionTomaMuestra','no puede estar vacio').not().isEmpty(),
    check('lugarTomaMuestra','no puede estar vacio').not().isEmpty(),
    check('muestraRecolectadaPor',).custom(helpersUsuario.existeUsuarioById),
    check('procedimientoMuestreo','no puede estar vacio').not().isEmpty(),
    check('tipoMuestra','no puede estar vacio').not().isEmpty(),
    check('matrizMuestra','no puede estar vacio').not().isEmpty(),
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

router.put('/:id',[
    check('id','no puede estar vacio').not().isEmpty(),
    check('id').custom(helpersMuestra.existeMuestraById),
    check('codMuestra','no puede estar vacio').not().isEmpty(),
    check('muniRecoleccion','no puede estar vacio').not().isEmpty(),
    check('direccionTomaMuestra','no puede estar vacio').not().isEmpty(),
    check('lugarTomaMuestra','no puede estar vacio').not().isEmpty(),
    check('procedimientoMuestreo','no puede estar vacio').not().isEmpty(),
    check('tipoMuestra','no puede estar vacio').not().isEmpty(),
    check('matrizMuestra','no puede estar vacio').not().isEmpty(),
    validarCampos
],muestra.muestraPut)

export default router