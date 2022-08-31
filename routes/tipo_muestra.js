import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import tipomuestra from '../controllers/tipo_muestra.js'

const router = new Router()

router.post('/',[
    check('tipos').not().isEmpty(),
    validarCampos
],tipomuestra.tipoMuestraPost)

router.get('/',tipomuestra.tipoMuestraGet)

export default router