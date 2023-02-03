import Calidad from '../models/calidad.js'

const helpersCalidad = {
    existeCalidadById: async (id) => {
        const existe = await Calidad.findById(id)
        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
}

export default helpersCalidad