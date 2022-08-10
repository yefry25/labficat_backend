import mongoose from "mongoose";

const Ordenschema = new mongoose.Schema({

idMuestra: {
    type: mongoose.Schema.ObjectId,
    ref:"Muestra",
    required:true
},
parametroTecMetodo:{
    type: String,
    required: true
},
estadoMuestra:{
    type: String,
    required: true
},
realizadoPor:{
    type: mongoose.Schema.ObjectId,
    ref:"Usuario",
    required:true
},
supervisadoPor:{
    type: mongoose.Schema.ObjectId,
    ref:"Usuario",
    required:true
},
observaciones:{
    type: String,
    default:""
},
estado:{
    type:Number,
    default:1
},
createdAt:{
    type:Date,
    default:Date.now
}
})

export default mongoose.model('Orden',Ordenschema)

/* faltan datos para terminar el modelo por completo */