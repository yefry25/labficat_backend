import mongoose from 'mongoose';

const MuestraSchema = new mongoose.Schema({
    solicitante: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
        required: true
    },
    codMuestra: {  ///  0001-2022
        type: String,
        required: true
    },
    munRecoleccion: {
        type: mongoose.Schema.ObjectId,
        ref: "Ciudad",
        required: true,
    },
    direccionTomaMuestra: {
        type: String,
        required: true,
    },
    lugarTomaMuestra: {
        type: String,
        required: true
    },
    muestraRecolectadaPor: {
        type: String,
        required: true
    },
    procedimientoMuestreo: {
        type: String,
        required: true,
        default: "????????????????"//averiguar
    },
    tipoMuestra: {
        type: mongoose.Schema.ObjectId,
        ref: "tipoMuestra",
        required: true
    },
    matrizMuestra: {
        type: String,//Panela
        required: true,
        default: "Panela"
    },
    fechaRecoleccion: {
        type: Date,
        required: true  ///UTC
    },
    cotizacion: {
        type: mongoose.Schema.ObjectId,
        ref: "Cotizacion",
        required: true
    },
    item: {
        type: String,
        required: true,
        default: "Item1" //mostrar con validaciones en el frontend si existe mas items para que le usuario pueda escojerlo a través del frontend
    },
    estado: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model('Muestra', MuestraSchema)