import mongoose from 'mongoose';

const CiudadSchema = new mongoose.Schema({
    departamento:{
        type:String,
        required: true
    },
    coddepartamento:{
        type:String,
        required:true    
    },
    ciudad:{
        type:String,
        required: true 
    },
    codciudad:{
        type:String,
        required: true
    },    
})

export default mongoose.model('Ciudad',CiudadSchema)