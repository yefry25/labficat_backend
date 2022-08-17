import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    
    tipoPersona: { //Natural  Juridica
        type: String,
        required: true,
        default: "Natural"
    },
    nombre: {
        type: String,
        required: true
    },
    documento: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    ciudad: {
        type: mongoose.Schema.ObjectId,
        ref: "Ciudad",
        required: true
    },
    contacto: {
        type: String,
    },
    telefono: {
        type: String,
        maxLength: 14,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    rol: {
        type: String,
        required: true
    },
    estado: {  //0 inactivo  1:activo   2:vacaciones
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model('Usuario', UsuarioSchema)