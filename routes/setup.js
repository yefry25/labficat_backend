import {Router} from "express"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/middleware.js";
import helpersUsuario from "../helpers/usuario.js";
import consecutivo from "../controllers/setup.js"

const router = new Router()

router.get('/listar',consecutivo.ConsecutivoGet)

router.get('/:id',[
    check('id').custom(helpersUsuario.existeUsuarioById),
],consecutivo.idConsecutivoGet)

router.post('/',[
check('consecutivoMuestra','el campo consecutivoMuestra no puede estar vacio ').not().isEmpty(),
check('consecutivoMuestra','el campo consecutivoOferta no puede estar vacio ').not().isEmpty(),
check('iva','en campo iva no puede estar vacio').not().isEmpty(),
validarCampos
],consecutivo.ConsecutivoPost)

export default router





