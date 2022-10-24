import { Router } from "express"
import { check } from "express-validator"
import { validarCampos } from "../middlewares/middleware.js"
import bitacora from '../controllers/bitacora.js'

const router = new Router()

router.get('/',bitacora.bitacoraGet )

export default router