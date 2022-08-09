import mongoose from 'mongoose';

const analisisMuestraSchema= new mongoose.Schema({
    ensayo:{
        type:String,
        required:true,
    },
    metodo:{
        type:String,
        required:true,
    },
    tecnica:{
        type:String,
        required:true,
    },
    valorMaximo:{
        type:String,
        required:true,
    },
    valorMinimo:{
        type:String,
        required:true,
    },
    unidades:{
        type:String,
        required:true,
    }
})

export default mongoose.model("Analisis",analisisMuestraSchema)
