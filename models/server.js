import express from "express"
import cors from "cors"
import { dbConnection } from "../database/config.js"
import ciudad from '../routes/ciudad.js'
import color from '../routes/color.js'
import cotizacion from '../routes/cotizacion.js'
import ensayo from '../routes/ensayo.js'
import resultado from "../routes/informe_resultados.js"
import muestra from "../routes/muestra.js"
import orden from "../routes/orden_servicio.js"
import setup from '../routes/setup.js'
import usuario from "../routes/usuario.js"
import tipomuestra from "../routes/tipo_muestra.js"
import bitacora from '../routes/bitacora.js'
import calidad from '../routes/calidad.js'
import fileUpload from "express-fileupload"

class Server {
    constructor() {
        this.app = express()
        this.middleware()
        this.port = process.env.PORT || "8080";
        this.conectarBd()
        this.routes()
    }
    routes() {
        this.app.use('/api/calidad', calidad)
        this.app.use('/api/bitacora', bitacora)
        this.app.use('/api/ciudad', ciudad)
        this.app.use('/api/color', color)
        this.app.use('/api/cotizacion', cotizacion)
        this.app.use('/api/ensayo', ensayo)
        this.app.use('/api/resultado', resultado)
        this.app.use('/api/muestra', muestra)
        this.app.use('/api/orden', orden)
        this.app.use('/api/setup', setup)
        this.app.use('/api/tipoMuestra', tipomuestra)
        this.app.use('/api/usuario', usuario)
    }
    async conectarBd() {
        await dbConnection()
    }
    middleware() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    escuchar() {
        this.app.listen(this.port, () => {
            console.log(`servidor escuchando en el puerto ${this.port}`);
        })
    }
}

export { Server }