import mongoose from 'mongoose';

const RecepcionSchema = new mongoose.Schema({
    idCliente: {
        type:mongoose.Schema.ObjectId,
        ref: "Usuario",
        required:true
    },
    datoMuestra: [
        {
            idMuestra: {
                type:mongoose.Schema.ObjectId,
                ref:"Muestra",
                required:true
            },
            cotizacion: {
                type:mongoose.Schema.ObjectId,
                ref:"Servicio",
                required:true
            },
            observaciones: {
                type:String,
                default:""
            }
        }
    ],
    quienEntreMuestras:{
        type:mongoose.Schema.ObjectId,
        ref: "Usuario",
        required:true
    },
    fechaRecepMuestras:{
        type:Date,
        required:true
    },
    recibeMuestras:{
        type:mongoose.Schema.ObjectId,
        ref: "Usuario",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Recepcion', RecepcionSchema)