import mongoose from 'mongoose';

const tipoMuestraSchema= new mongoose.Schema({

    tipos:{
        type: String,
        required: true,
    }
})

export default mongoose.model("tipoMuestra",tipoMuestraSchema)

// en bloque
// pulverizada