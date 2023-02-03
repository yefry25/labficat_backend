import mongoose from 'mongoose';

const CalidadSchema = new mongoose.Schema({
    formato:{
        type:String,
        required: true
    },
    codigo:{
        type:String,
        required:true
    },
    aprobacion:{
        type:String,
        required:true
    },
    version:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Calidad',CalidadSchema)