import mongoose from "mongoose";
import Usuario from "../models/usuario.js"

const helpersUsuario = {
    existeUsuario: async (idCliente)=>{
        for (let i = 0; i < idCliente.length; i++) {
            const element = idCliente[i];
            const validarId = mongoose.Types.ObjectId(element.codigo);
    
            if(!validarId){
                throw new Error('el ID no existe')
            }
            
            const x = element.codigo
            const existe = await Usuario.findById(x);
    
            if (!existe){
                throw new Error('el cliente no existe')
            }
        }
    },

    existeEmail:async(correo) => {

        const existe = await Usuario.findOne({ correo });

        if (existe) {
            throw new Error(`El email ya esta registrado`)
        }
    },

    existeUsuarioById: async (id) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
}
export default helpersUsuario