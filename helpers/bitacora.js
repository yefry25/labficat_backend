import Bitacora from '../models/bitacora.js'
import Usuario from '../models/usuario.js'

const helperBitacora = {
    llenarBitacora: async (idPerson,observacion) => {
        if(idPerson && observacion){
            const bitacoras = new Bitacora({usuario:idPerson, mensaje:observacion})
        bitacoras.save()
        }else {
            console.log('No hay informacion para realizar la bitacora')
        }
    }
}
export default helperBitacora