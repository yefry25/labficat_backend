import mongoose from 'mongoose';
import Resultado from "../models/informe_resultado.js"

const helpersResultado = {
    existeResultadoById: async (id) => {
        const existe = await Resultado.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
}

export default helpersResultado
