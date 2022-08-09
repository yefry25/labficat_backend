import mongoose from 'mongoose';

const ResultadosSchema = new mongoose.Schema({

    informeResulNumero: {
        type: String,
        required: true
    },
    fechaRecepMuestra: {
        type: Date,
        required: true
    },
    fechaEmisionInforme: {
        type: Date,
        required: true
    },
    idCliente: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
        required: true

    },
    idMuestra: {
        type: mongoose.Schema.ObjectId,
        ref: "Muestra",
        required: true
    },
    analisisMuestra: [
        {
            fechaAnalisis: {
                type: Date,
                required: true
            },
            ensayo: {
                type: mongoose.Schema.ObjectId,
                ref: "Analisis",
                required: true 
            },
            resultado: {
                type: String,
                required: true
            },
            incertidumbreExpandida: {
                type: String,
                required: true
            }, 
        }
    ],
    observaciones: {
        type:String,
        default:""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model("Resultado", ResultadosSchema) 