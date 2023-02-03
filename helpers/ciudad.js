import Ciudad from '../models/ciudad.js'

const helpersCiudad = {

    existeCiudadById : async (id) => {
     const existe = await Ciudad.findById(id)

        if(!existe){
            throw new Error(`El id no existe ${id}`)
        }
    },
    existeMunicipioById : async (id) => {
        const existe = await Ciudad.findById(id)
        console.log(existe);
        if(!existe){
            throw new Error(`El id no existe ${id}`)
        }
    }
}

export default helpersCiudad