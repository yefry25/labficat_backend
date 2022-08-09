import {Router} from 'express'
import {validarCampos} from "../middlewares/middleware.js"
import {check} from "express-validator"
import helpersTipoMuestra from "../helpers/tipo_muestra.js"
import tipomuestra from "../controllers/tipo_muestra.js" 

const router= new Router()

router.post('/',tipomuestra.tipoMuestraPost),

router.get('/get',tipomuestra.tipoMuestraGet)

export default router