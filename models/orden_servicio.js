import mongoose from "mongoose";

const Ordenschema = new mongoose.Schema({

    idMuestra: {
        type: mongoose.Schema.ObjectId,
        ref: "Muestra",
        required: true
    },
    itemsorden: [{
        idensayo:{
            type: mongoose.Types.ObjectId,
            ref: "Ensayo",
            required: true
        },
        responsable:{
            type: mongoose.Types.ObjectId,
            ref: "Usuario"
        },
        supervisor:{
            type: mongoose.Types.ObjectId,
            ref: "Usuario"
        },
        resultado:{  //hacer un put para llenar estos datos
            type: Number,
            default:0
        },
        incertidumbre:{  //hacer un put para llenar estos datos
            type: Number ,
            default:0
        },
        estado:{
            type: String,
            default: "En proceso "
        },
    }],
    observaciones: {
        type: String,
        default:""
        
    },  //informe de resultados en un get de orden de servicio 
    estado: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Orden', Ordenschema)

/* faltan datos para terminar el modelo por completo */