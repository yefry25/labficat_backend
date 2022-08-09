import mongoose from 'mongoose';

const MuestraSchema = new mongoose.Schema({
    idCliente: {
        type:mongoose.Schema.ObjectId,
        ref:"Usuario",
        required:true
    },
    codMuestra:{
        type:String,
        required:true
    },
    muniRecoleccion : {
        type:String,
        required:true,
    },
    direccionTomaMuestra : {
        type:String,
        required:true,
    },
    lugarTomaMuestra : {
        type:String,
        required:true
    },
    muestraRecolectadaPor : {
        type:mongoose.Schema.ObjectId,
        ref:"Usuario",
        required:true
    },
    procedimientoMuestreo : {
        type:String,
        required:true
    },
    tipoMuestra : {
        type: mongoose.Schema.ObjectId,
        ref: "tipoMuestra",
        required: true 
    },
    matrizMuestra : {
        type:String,
        required:true
    },
    fechaRecoleccion: {
        type:Date,
        required:true
    },
    estado:{
        type:Number,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

export default mongoose.model('Muestra', MuestraSchema)