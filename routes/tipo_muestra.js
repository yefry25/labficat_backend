import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import tipomuestra from '../controllers/tipo_muestra.js'
import helpersMuestra from '../helpers/tipo_muestra.js'

const router = new Router()

router.post('/',[
    check('tipos','el campo tipos no puede estar vacio').not().isEmpty(),
    validarCampos
],tipomuestra.tipoMuestraPost)

router.get('/',tipomuestra.tipoMuestraGet)

router.put('/:id',[
    check('id','el id debe ser válido').isMongoId(),
    check('id').custom(helpersMuestra.existeTipoMuestraId),
    check('tipos','no puede estar vacio el campo tipo').not().isEmpty(),
    validarCampos
],tipomuestra.tipoMuestraPut)

export default router