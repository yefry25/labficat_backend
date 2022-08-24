import Cotizacion from '../models/cotizacion.js'

const helpersCotizacion= {
    existeCotizacion : async (id)=>{
        const existe = await Cotizacion.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        } 
    }
}

export default helpersCotizacion