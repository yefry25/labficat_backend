import {Router} from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import helpersCalidad from '../helpers/calidad.js'
import calidad from '../controllers/calidad.js'

const router=new Router()

router.get('/',calidad.calidadGet)

router.post('/insertar',[
    check('formato', 'el campo formato no puede estar vacio').not().isEmpty(),
    check('codigo', 'el campo codigo no puede estar vacio').not().isEmpty(),
    check('aprobacion','el campo aprobacion no puede estar vacio').not().isEmpty(),
    check('version','el campo version no puede estar vacio').not().isEmpty(),
    validarCampos
],calidad.calidadPost)

router.post('/formato',[
    check('nombre','El campo nombre no puede estar vacio').not().isEmpty(),
    validarCampos
],calidad.calidadNombre)

router.put('/modificar/:id',[
    check('id','el campo debe ser valido').isMongoId(),
    check('id').custom(helpersCalidad.existeCalidadById),
    validarCampos
],calidad.calidadPut)

export default router