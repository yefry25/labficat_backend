import mongoose from "mongoose";
import Usuario from "../models/usuario.js"

const helpersUsuario = {
    existeUsuario: async (idCliente) => {
        for (let i = 0; i < idCliente.length; i++) {
            const element = idCliente[i];
            const validarId = mongoose.Types.ObjectId(element.codigo);

            if (!validarId) {
                throw new Error('el ID no existe')
            }

            const x = element.codigo
            const existe = await Usuario.findById(x);

            if (!existe) {
                throw new Error('el cliente no existe')
            }
        }
    },

    existeEmail: async (correo) => {

        const existe = await Usuario.findOne({ correo });

        if (existe) {
            throw new Error(`El email ya esta registrado`)
        }
    },

    existeDocumento: async (documento) => {

        const existe = await Usuario.findOne({ documento });

        if (existe) {
            throw new Error(`El documento ya esta registrado`)
        }
    },

    existeEmailChangePassword: async (correo) => {

        const existe = await Usuario.findOne({ correo });

        if (!existe) {
            throw new Error('El correo con el cual quieres hacer el cambio de contraseña no existe')
        }
    },

    existeUsuarioById: async (id) => {
        const existe = await Usuario.findById(id)
        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeResponsables: async (responsables) => {
        const titular = responsables.titular

        const suplente = responsables.suplente

        const existeTitular = await Usuario.findById(titular)
        const existeSuplente = await Usuario.findById(suplente)

        if (!existeTitular) {
            throw new Error(`El id de titular no existe ${titular}`)
        }

        if (!existeSuplente) {
            throw new Error(`El id de suplente no existe ${suplente}`)
        }
    }
}
export default helpersUsuario