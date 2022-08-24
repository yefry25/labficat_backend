import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import ensayo from '../controllers/ensayo.js'
import helpersUsuario from '../helpers/usuario.js'


const router = new Router()

router.get('/',ensayo.ensayoGet)

router.post('/',[
    check('ensayo','no puede estar vacio').not().isEmpty(),
    check('metodo','no puede estar vacio').not().isEmpty(),
    check('tecnica','no puede estar vacio').not().isEmpty(),
    check('valorMinimo','no puede estar vacio').not().isEmpty(),
    check('valorMaximo','no puede estar vacio').not().isEmpty(),
    check('unidades','no puede estar vacio').not().isEmpty(),
    check('costo','no puede estar vacio').not().isEmpty(),
    check('descripcion','no puede estar vacio').not().isEmpty(),
    check('limiteCuantificacion','no puede estar vacio').not().isEmpty(),
    check('responsables').custom(helpersUsuario.existeResponsables),
    validarCampos
],ensayo.ensayoPost)

router.get('/',ensayo.ensayoGet)

export default router