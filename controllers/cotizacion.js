import Cotizacion from "../models/cotizacion.js"
import Setup from "../models/setup.js"

const cotizacion = {

  cotizacionPost: async (req, res) => {
    const { fechaEmision, idCliente, idContacto, validezOferta, entregaResultados, idElaboradoPor, items, observaciones, subTotal, descuento, iva, total } = req.body

    const consecutivo =await Setup.findOne()
    let conse=""
    if (consecutivo.consecutivoOferta.length==1) conse="000"+consecutivo.consecutivoOferta
    else if (consecutivo.consecutivoOferta.length==2) conse="00"+consecutivo.consecutivoOferta
    else if (consecutivo.consecutivoOferta.length==3) conse="0"+consecutivo.consecutivoOferta
    else conse=consecutivo.consecutivoOferta

    const numCotizacion=conse+"-"+getFullYear()+"V1"
    split

    const nuevoconsecutivo=consecutivo.consecutivoOferta++
    const guardar=Setup.findByIdAndUpdate(consecutivo._id,{consecutivoOferta:nuevoconsecutivo)

    try {
      numCotizacion=contiza()
      const cotizacion = new Cotizacion({ numCotizacion, fechaEmision, idCliente, idContacto, validezOferta, entregaResultados, idElaboradoPor, items, observaciones, subTotal, descuento, iva, total })

      if (!cotizacion) {
        return res.status(400).json({ msg: "No se puedo registrar la oferta de servicio" })
      }
      cotizacion.save()
      res.json({ cotizacion })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el webMaster" })
    }
  },

  cotizacionGet: async (req, res) => {
    try {
      const cotizacion = await Cotizacion.find();

      if (!cotizacion) {
        return res.status(400).json({ msg: "No se encontro nada" })
      }
      res.json({ cotizacion })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el webMaster" })
    }
  },

  listarCotizacion: async (req, res) => {
    const { numCotizacion } = req.body
    try {

      const cotizacion = await Cotizacion.find({ numCotizacion });

      if (!cotizacion) {
        return res.status(400).json({ msg: "Numero de cotizacion incorrecto" })
      }
      res.json({ cotizacion })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  servicioGetFechaEmision: async (req, res) => {
    const { fechaEmision } = req.body;
    let fechaI = `${fechaEmision}T00:00:00.000-05:00`
    let fechaF = `${fechaEmision}T23:59:59.000-05:00`

    try {

      const cotizacion = await Cotizacion.find({
        $and: [
          {
            fechaEmision: {
              $gte: new Date(fechaI)
            }
          },
          {
            fechaEmision: {
              $lte: new Date(fechaF)
            }
          }
        ]
      }
      );

      if (!cotizacion) {
        return res.status(400).json({ msg: "No se encontro" })
      }

      res.json({
        cotizacion
      })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
}

export default cotizacion