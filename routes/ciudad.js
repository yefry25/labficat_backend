import { Router } from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import ciudad from '../controllers/ciudad.js'

const router = new Router()

router.post('/',[
    check('departamento','no puede estar vacio').not().isEmpty(),
    check('codDepartamento','no puede estar vacio').not().isEmpty(),
    check('ciudad','no puede estar vacio').not().isEmpty(),
    check('codCiudad','no puede estar vacio').not().isEmpty(),
    validarCampos
],ciudad.ciudadPost)

router.get('/',ciudad.ciudadGet)

router.post('/codigoCiudad',[
    check('codCiudad','no puede estar vacio').not().isEmpty(),
    validarCampos
],ciudad.ciudadGetCod)

router.post('codDepartamento',[
    check('codDepartamento','no puede estar vacio').not().isEmpty(),
    validarCampos
],ciudad.ciudadGetDepartamento)

router.post('/ciudad',[
    check('ciudad','no puede estar vacio').not().isEmpty(),
    validarCampos
],ciudad.ciudadGetNombre)

router.post('/departamento',[
    check('departamento','no puede estar vacio').not().isEmpty(),
    validarCampos
],ciudad.ciudadGetNombre)

export default router

