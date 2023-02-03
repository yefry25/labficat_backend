import { Router } from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import ciudad from '../controllers/ciudad.js'

const router = new Router()

router.get('/',ciudad.ciudadGet)

router.post('/codigoCiudad',[
    check('codCiudad','no puede estar vacio el campo codigo de la ciudad').not().isEmpty(),
    validarCampos
],ciudad.ciudadGetCod)

router.post('/codigoDepartamento',[
    check('codDepartamento','no puede estar vacio el campo codigo del departamento').not().isEmpty(),
    validarCampos
],ciudad.ciudadGetDepartamento)

router.post('/nombreCiudad',[
    check('ciudad','no puede estar vacio el campo nombre de la ciudad').not().isEmpty() ,
    validarCampos
],ciudad.ciudadGetNombre)

router.post('/nombreDepartamento',[
    check('departamento','no puede estar vacio el campo nombre del departamento').not().isEmpty(),
    validarCampos
],ciudad.ciudadGetNombreDepartamento)

router.get('/departamentos',[
],ciudad.ciudadDepartamentos)

export default router

