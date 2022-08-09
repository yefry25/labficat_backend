import Servicio from "../models/oferta_servicio.js"

const servicios = {

  servicioPost: async (req, res) => {
    const { numCotizacion, fechaEmision, idCliente, idContacto, idElaboradoPor, item, observaciones, subTotal, iva, total, idClienteAceptaCondiciones } = req.body

    try {
      const servicio = new Servicio({ numCotizacion, fechaEmision, idCliente, idContacto, idElaboradoPor, item, observaciones, subTotal, iva, total, idClienteAceptaCondiciones })

      if (!servicio) {
        return res.status(400).json({ msg: "No se puedo registrar la oferta de servicio" })
      }
      servicio.save()
      res.json({ servicio })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el webMaster" })
    }
  },

  servicioGet: async (req, res) => {

    try {
      const servicio = await Servicio.find();

      if (!servicio) {
        return res.status(400).json({ msg: "No se encontro nada" })
      }
      res.json({ servicio })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el webMaster" })
    }
  },

  listarCotizacion: async (req, res) => {
    const { numCotizacion } = req.body

    try {

      const servicio = await Servicio.find({ numCotizacion });

      if (!servicio) {
        return res.status(400).json({ msg: "Numero de cotizacion incorrecto" })
      }
      res.json({ servicio })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  servicioGetFechaEmision: async (req, res) => {
    const { fechaEmision } = req.body;
    let fechaI = `${fechaEmision}T00:00:00.000-05:00`
    let fechaF = `${fechaEmision}T23:59:59.000-05:00`

    try {

      const servicio = await Servicio.find({
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

      if (!servicio) {
        return res.status(400).json({ msg: "No se encontro" })
      }

      res.json({
        servicio
      })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  servicioGetCodReferencia: async (req, res) => {
    const { codigoReferencia } = req.body

    try {

      const codReferencia = await Servicio.find().where('item.codigoReferencia').in(codigoReferencia).exec();

      if (!codReferencia) {
        return res.status(400).json({ msg: "No se encontro" })
      }

      res.json({ codReferencia })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  servicioGetTecAnalitica: async (req, res) => {
    const { tecnica } = req.body

    try {

      const tecAnalitica = await Servicio.find().where('item.tecnicaAnalitica').in(tecnica).exec();

      if (!tecAnalitica) {
        return res.status(400).json({ msg: "No se encontro" })
      }

      res.json({ tecAnalitica })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  servicioGetMetAnalitico: async (req, res) => {
    const { metodo } = req.body

    try {

      const metAnalitico = await Servicio.find().where('item.metodoAnalitico').in(metodo).exec();

      if (!metAnalitico) {
        return res.status(400).json({ msg: "No se encontro" })
      }

      res.json({ metAnalitico })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  putOfertaServicio: async (req, res) => {
    const { id } = req.params
    const { _id, createAt, idCliente, idContacto, idElaboradoPor, idClienteAceptaCondiciones, ...resto } = req.body

    try {
      const modificar = await Servicio.findByIdAndUpdate(id, resto);

      if (!modificar) {
        return res.status(400).json({
          msg: "no se encontro el id"
        })
      }
      res.json({ modificar })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
}

export default servicios 