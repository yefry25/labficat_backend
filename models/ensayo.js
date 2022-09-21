import mongoose from 'mongoose';

const EnsayoSchema = new mongoose.Schema({

    ensayo: {
        type: String,
        required: true,
        unique: true  //helpers para que funcione, ya que si lo emetmeos con el mismo nombre crahea ya que es unica, no puede haber dos ensayos con el mism nombre
    },
    metodo: {
        type: String,
        required: true,
    },
    tecnica: {
        type: String,
        required: true,
    },
    valorMinimo: {
        type: String,
        required: true,
        default: "N.A."
    },
    valorMaximo: {
        type: String,
        required: true,
        default: "N.A."
    },
    unidades: {
        type: String,
        required: true,
        default: "fracción en masa en %"
    },
    costo: {
        type: Number,
        required: true,
        default: 0
    },
    estado: {
        type: Number,
        required: true,
        default: 1
    },
    descripcion: {
        type: String,
    },
    limiteCuantificacion: {
        type: Number,
        required: true
    },
    responsables: {
        titular: {
            type: mongoose.Schema.ObjectId,
            ref: "Usuario",
        },
        suplente: {
            type: mongoose.Schema.ObjectId,
            ref: "Usuario",
        }
    }
})

export default mongoose.model("Ensayo", EnsayoSchema)
