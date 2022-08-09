import mongoose from 'mongoose';

const tipoMuestraSchema= new mongoose.Schema({

    tipos:{
        type: 'string',
        required: true,
    }
})

export default mongoose.model("tipoMuestra",tipoMuestraSchema)