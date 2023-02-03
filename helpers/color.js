import Color from "../models/color.js"

const helperColor = {
    existeIdColor: async(id)=>{
        const existe = await Color.findById(id)
        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }
}

export default helperColor