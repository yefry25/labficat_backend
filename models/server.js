import express from "express"
import cors from "cors"
import {dbConnection} from "../database/config.js"
import usuario from "../routes/usuario.js"
import muestra from "../routes/muestra.js"
import oferta from "../routes/oferta_servicio.js"
import orden from "../routes/orden_servicio.js"
import recepcion from "../routes/recepcion_muestra.js"
import solicitudSeguimiento from "../routes/solicitud_seguimiento_recepcion.js"
import resultado from "../routes/informe_resultados.js"
import tipomuestra from "../routes/tipo_muestra.js"

class Server {
    constructor() {
        this.app=express()
        this.middleware()
        this.port=process.env.PORT
        this.conectarBd()
        this.routes()
    }
    routes () {
        this.app.use('/api/usuario',usuario)
        this.app.use('/api/muestra',muestra)
        this.app.use('/api/oferta',oferta)
        this.app.use('/api/orden',orden)
        this.app.use('/api/recepcion',recepcion)
        this.app.use('/api/solicitud',solicitudSeguimiento)
        this.app.use('/api/resultado',resultado)
        this.app.use('/api/tipomuestra',tipomuestra)
    }

    async conectarBd(){
        await dbConnection()
    }

    middleware () {
        this.app.use(express.json())
        this.app.use(cors())
    }

    escuchar () {
        this.app.listen(this.port, ()=>{
            console.log(`servidor escuchando en el puerto ${this.port}`);
        })
    }
}

export {Server}