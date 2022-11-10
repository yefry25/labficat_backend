import mongoose from 'mongoose';

const ServicioSchema = new mongoose.Schema({
    numCotizacion: {        /* ej: 0001-2022V1 */
        type: String,
        required: true
    },
    fechaEmision: {
        type: Date,
        required: true,
        default:Date.now
    },
    idCliente: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
        required: true
    },
    validezOferta: {
        type: Date,
        required: true
    },
    entregaResultados: {
        type: Date,
        required: true
    },
    idElaboradoPor: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
        required: true
    },
    items: {
        item1: {
            itemsEnsayo: [{
                ensayo: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Ensayo",
                    required: true
                },
                limiteCuantificacion:{
                    type:Number,
                    required:true
                },
                costoEnsayo: {
                    type: Number,
                    required: true
                },
            }],
            costo:{
                type:Number,
                default:0,
                required: true
            } 
        },
        item2: {
            itemsEnsayo: [{
                ensayo: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Ensayo",
                    default:""
                },
                limiteCuantificacion:{
                    type:Number,
                    default:0
                },
                costoEnsayo: {
                    type: Number,
                    default:0
                },
            }],
            costo:{
                type:Number,
                default:""
            } 
        },
        item3: {
            itemsEnsayo: [{
                ensayo: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Ensayo",
                    default:""
                },
                limiteCuantificacion:{
                    type:Number,
                    default:0
                },
                costoEnsayo: {
                    type: Number,
                    default:0
                },
            }],
            costo:{
                type:Number,
                default:""
            } 
        },
        costoItem:{ 
            type:Number,
            default:0,
            required:true
        }
    },
    observaciones: {
        type: String,
        default: ""
    },
    observacionRechazo: {
        type: String,
        default: ""
    },
    subTotal: {
        type: Number,
        required: true
    },
    descuento: {///descuento sobre el subtotal
        type: Number,
        default:""
    },
    iva: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    estado:{
        type: Number,
        default: 1   /* 0: rechazada 1: enviada 2: aceptada*/
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Cotizacion', ServicioSchema)