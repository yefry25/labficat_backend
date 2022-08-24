import mongoose from 'mongoose';
import Orden from "../models/orden_servicio.js"

const helpersOrden ={
    existeOrdenById: async (id) => {
        const existe = await Orden.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeEnsayoById: async (id)=>{
        const existe = await Orden.findById(id)

        if (!existe) {
            throw new Error(`El ensayo con id ${id} no existe `)
        }
    }
}

export default helpersOrden