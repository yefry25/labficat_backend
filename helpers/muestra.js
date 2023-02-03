import mongoose from "mongoose";
import Muestra from '../models/muestra.js';

const helpersMuestra = {
    existeMuestra: async (idMuestra)=>{
        for (let i = 0; i < idMuestra.length; i++) {
            const element = idMuestra[i];
            const validarId = mongoose.Types.ObjectId(element.codigo);

            if(!validarId){
                throw new Error('el ID no existe')
            }
            
            const x = element.codigo
            const existe = await Muestra.findById(x) ;
    
            if (!existe){
                throw new Error('el muestra no existe')
            }
        }
    },

    existeMuestraById: async (id) => {
        const existe = await Muestra.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeMuestraRecepcion: async (datoMuestra)=>{
        for (let i = 0; i < datoMuestra.length; i++) {
            const element = datoMuestra[i];
            const validarId = mongoose.Types.ObjectId(element.idMuestra);
    
            if(!validarId){
                throw new Error('el ID no existe')
            }
            const x = element.idMuestra
            const existe = await Muestra.findById(x);
    
            if (!existe){
                throw new Error('la muestra de recepcion no existe')
            }
        }
    },
}

export default helpersMuestra