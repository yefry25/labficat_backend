import Cotizacion from '../models/cotizacion.js'

const helpersCotizacion= {
    existeCotizacion : async (id)=>{
        const existe = await Cotizacion.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        } 
    },

    modificarCotizacion : async (id)=>{
        const existe = await Cotizacion.findOne();
        console.log("id base de datos"+existe._id);
        console.log("id que traigo"+id);
    }
}

export default helpersCotizacion