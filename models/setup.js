import mongoose from 'mongoose';

const ConsecutivoSchema= new mongoose.Schema({
    consecutivoMuestra:{
        type: Number,
        required: true,
    },
    consecutivoOferta:{
        type: Number,
        required: true,
    },
    iva:{
        type:Number,
        required:true,
        default:19
    }
})

export default mongoose.model("Consecutivo",ConsecutivoSchema)