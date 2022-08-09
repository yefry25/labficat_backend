import mongoose from 'mongoose';
import Solicitud from "../models/solicitud_seguimiento_recepcion.js"

const helpersSolicitud = {

    existeSolicitudById: async (id) => {
        const existe = await Solicitud.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
}

export default helpersSolicitud