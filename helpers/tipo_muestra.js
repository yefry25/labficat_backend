import tipoMuestra from "../models/tipo_muestra.js"

const helpersTipoMuestra ={

    existeTipoMuestraId: async (id) => {
        const existe = await tipoMuestra.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

}

export default helpersTipoMuestra