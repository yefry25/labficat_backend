import mongoose from 'mongoose';
import Orden from "../models/orden_servicio.js"

const helpersOrden ={

    existeOrdenById: async (id) => {
        const existe = await Orden.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

}

export default helpersOrden