import mongoose from 'mongoose';

const SolSegRecSchema = new mongoose.Schema({
    fecha: {
        type:Date,
        required: true
    },
    cotizacion: {
        type:mongoose.Schema.ObjectId,
        ref:"Servicio",
        required:true
    },
    idCliente: {
        type:mongoose.Schema.ObjectId,
        ref: "Usuario",
        required:true
    },
    idContacto: {
        type:mongoose.Schema.ObjectId,
        ref: "Usuario",
        required:true
    },
    solicitud: {
        type:String,
        required:true
    },
    medioSolicitud: {
        type:String,
        required:true
    },
    recibidoPor: {
        type:String,
        required:true
    },
    porcentajeAceptacion: {
        type:String,
        required:true
    },
    registroAceptacion: {
        type:String,
        required:true
    },
    motivoRechazo: {
        type:String,
        required:true
    },
    seguimientoCotizacion: [
        {
            type:String,
            required:true
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Solsegrec',SolSegRecSchema)