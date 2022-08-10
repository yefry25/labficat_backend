import mongoose from 'mongoose';

const ServicioSchema = new mongoose.Schema({
    numCotizacion: {          /* ej: 0001-2022V1 */
        type: String,
        required: true
    },
    fechaEmision: {
        type: Date,
        required: true
    },
    idCliente: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
        required: true
    },
    idContacto: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
        required: true
    },
    validezoferta: {
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
                limiteCuantificacion: {
                    type: Number,
                    required: true
                },
                costoEnsayo: {
                    type: Number,
                    required: true
                },
            }],
        },
        item2: {
            itemsEnsayo: [{
                ensayo: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Ensayo",
                    required: true
                },
                limiteCuantificacion: {
                    type: Number,
                    required: true
                },
                costoEnsayo: {
                    type: Number,
                    required: true
                },
            }],
        },
        item3: {
            itemsEnsayo: [{
                ensayo: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Ensayo",
                    required: true
                },
                limiteCuantificacion: {
                    type: Number,
                    required: true
                },
                costoEnsayo: {
                    type: Number,
                    required: true
                },
            }],
        },
        costo: {
            type: Number,
            required: true
        }
    },
    observaciones: {
        type: String,
        default: ""
    },
    subTotal: {
        type: Number,
        required: true
    },
    descuento: {///descuento sobre el subtotal
        type: Number,
        required: true
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
        default: 1   /* 0: anulada 1: vigente */
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Servicio', ServicioSchema)