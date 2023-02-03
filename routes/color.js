import {Router} from "express"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/middleware.js";
import colores from "../controllers/color.js";
import helperColor from "../helpers/color.js";
import validar from '../middlewares/validar.js';

const router = new Router();

router.get('/',colores.colorGet)

router.post('/',colores.obtenerColor)

router.put('/modificar/:id',[
    validar.validarJWT,
    check('id','el id debe ser válido').isMongoId(),
    check('id').custom(helperColor.existeIdColor),
    check('color','El campo color no puede estar vacio').not().isEmpty(),
    validarCampos
],colores.actualizarColor)

export default router