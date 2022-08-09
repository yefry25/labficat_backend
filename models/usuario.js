import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required: true
    },
    nitOcc:{
        type:String,
        required:true    
    },
    direccion:{
        type:String,
        required: true 
    },
    ciudad:{
        type:String,
        required: true

    },
    departamento:{
        type:String,
        required: true
    },
    contacto:{
        type:String,
        required: true
        
    },
    telefono:{
        type:String,
        maxLength:14,
        required:true
        
    },
    correo:{
       type:String, 
       required: true
    },
    rol:[
        { 
            type:String,
            required:true
        }
    ],

    estado:{
        type:Number,
        default:1
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})

export default mongoose.model('Usuario',UsuarioSchema)