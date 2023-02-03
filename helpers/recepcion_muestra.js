import Recepcion from "../models/recepcion_muestra.js";

const helpersRecepcion = {
    existeRecepcionById: async (id) => {
        const existe = await Recepcion.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
}

export default helpersRecepcion