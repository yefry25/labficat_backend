import {Router} from "express"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/middleware.js";
import consecutivo from "../controllers/setup.js"
import helpersSetup from '../helpers/setup.js'

const router = new Router()

router.get('/',consecutivo.ConsecutivoGet)

router.post('/',consecutivo.ConsecutivoPost)

router.put('/modificar/:id',[
    check('id','el id enviado debe ser valido').isMongoId(),
    check('id').custom(helpersSetup.existeSetupById),
    validarCampos
],consecutivo.ConsecutivoPut)

router.post('/color',[
    check('color','El campo color no puede estar vacio').not().isEmpty(),
    validarCampos
],consecutivo.obtenerColor)

export default router