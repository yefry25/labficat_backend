import mongoose from 'mongoose';

const BitacoraSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
        required: true
    },
    mensaje:{
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Bitacora',BitacoraSchema)