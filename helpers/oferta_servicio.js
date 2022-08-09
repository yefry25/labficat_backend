import mongoose from 'mongoose';
import Servicio from "../models/oferta_servicio.js"

const helpersOferta = {
    existeCotizacion: async (datoMuestra)=>{
        for (let i = 0; i < datoMuestra.length; i++) {
            const element = datoMuestra[i];
            const validarId = mongoose.Types.ObjectId(element.cotizacion);
    
            if(!validarId){
                throw new Error('el ID no existe')
            }
            
            const x = element.cotizacion
            const existe = await Servicio.findById(x);
    
            if (!existe){
                throw new Error('la cotizacion no existe')
            }
        }
    },

    existeCotizacionById: async (id) => {
        const existe = await Servicio.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeOfertaById: async (id) => {
        const existe = await Servicio.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
}

export default helpersOferta