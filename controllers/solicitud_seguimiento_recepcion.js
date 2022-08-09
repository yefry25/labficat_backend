import Solsegrec from "../models/solicitud_seguimiento_recepcion.js"

const solsegrec = {
    solSegRecPost: async (req, res) => {
        const { fecha, cotizacion, idCliente, idContacto, solicitud, medioSolicitud, recibidoPor, porcentajeAceptacion, registroAceptacion, motivoRechazo, requimientoCotizacion } = req.body

        try {

            const solsegrec = new Solsegrec({ fecha, cotizacion, idCliente, idContacto, solicitud, medioSolicitud, recibidoPor, porcentajeAceptacion, registroAceptacion, motivoRechazo, requimientoCotizacion })

            if (!solsegrec) {
                return res.status(500).json({ msg: "No se registro la solicitud de seguimiento" })
            }

            solsegrec.save()
            res.json({ solsegrec })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    solSegRecGet: async (req, res) => {

        try {
            const solsegrec = await Solsegrec.find();

            if (!solsegrec) {
                return res.status(400).json({
                    msg: "No hay clientes"
                })
            }
            res.json({ solsegrec })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
}

export default solsegrec

