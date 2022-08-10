import mongoose from 'mongoose';

const ResultadosSchema = new mongoose.Schema({
    idMuestra: {
        type: mongoose.Schema.ObjectId,
        ref: "Muestra",
        required: true
    },
    informeResulNumero: {
        type: String,
        required: true
    },
    fechaEmisionInforme: {
        type: Date,
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
                ref: "Ensayo",
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

/* faltan datos para terminar el modelo por completo */