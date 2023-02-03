import mongoose from 'mongoose';

const CiudadSchema = new mongoose.Schema({
    departamento:{
        type:String,
        required: true
    },
    codDepartamento:{
        type:String,
        required:true    
    },
    Ciudad:{
        type:String,
        required: true 
    },
    codCiudad:{
        type:String,
        required: true
    },  
})

export default mongoose.model('Ciudad',CiudadSchema)