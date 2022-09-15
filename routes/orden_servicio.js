import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersUsuario from "../helpers/usuario.js"
import Ordenes from "../controllers/orden_servicio.js"

const router = new Router()

router.get('/',Ordenes.ordenGet)

router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
],Ordenes.ordenActivar)

router.put('/desactivar/:id',[ 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
],Ordenes.ordenDesactivar)

export default router