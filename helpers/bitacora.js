import Bitacora from '../models/bitacora.js'

const helperBitacora = {
    llenarBitacora: async (id,observacion) => {
        const bitacoras = new Bitacora({usuario:id, mensaje:observacion})
        bitacoras.save()
    }
}

export default helperBitacora