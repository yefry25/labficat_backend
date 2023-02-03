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
    celularContacto:{
        type:String
    },
    telefono: {
        type: String,
        maxLength: 14,
        required: true
    },
    foto: {
        type: String,
        default:""
    },
    borrarFoto: {
        type: String,
        default:""
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minLength:8
    },
    rol: {
        type: String,
        required: true
    },
    estado: {  //0 inactivo  1:activo   2:vacaciones
        type: Number,
        default: 1
    },
    resetToken:{
        type:String,
        default:''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model('Usuario', UsuarioSchema)