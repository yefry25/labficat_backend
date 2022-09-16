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

router.post('/',consecutivo.ConsecutivoPost)

router.put('/modificar/:id',consecutivo.ConsecutivoPut)

export default router