import mongoose from 'mongoose';

const ServicioSchema = new mongoose.Schema({
    numCotizacion: {
        type:String,
        required:true
    },
    fechaEmision: {
        type:Date,
        required:true
    },
    idCliente: {
        type:mongoose.Schema.ObjectId,
        ref:"Usuario",
        required:true
    },
    idContacto:{
        type:mongoose.Schema.ObjectId,
        ref:"Usuario",
        required:true
    },
    idElaboradoPor:{
        type:mongoose.Schema.ObjectId,
        ref:"Usuario",
        required:true
    },
    item:[
        {
            codigoReferencia: {
                type:String,
                required:true
            },
            descripcionEnsayo: {
                type:String,
                required:true
            },
            unidades: {
                type:Number,
                required:true
            },
            tecnicaAnalitica: {
                type:String,
                required:true
            },
            metodoAnalitico: {
                type:String,
                required:true
            },
            limiteCuantificacion: {
                type:Number,
                required:true
            },
            costoEnsayo: {
                type:Number,
                required:true
            },
            costoItem: {
                type:Number,
                required:true
            }
        }
    ],
    observaciones:{
        type:String,
        default:""
    },
    subTotal: {
        type:Number,
        required:true
    },
    iva: {
        type:Number,
        required:true
    },
    total: {
        type:Number,
        required:true
    },
    idClienteAceptaCondiciones:{
        type:mongoose.Schema.ObjectId,
        ref:"Usuario",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Servicio', ServicioSchema)