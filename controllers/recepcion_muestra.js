import Recepcion from "../models/recepcion_muestra.js"

const RecepcionMuestra = {

  recepcionPost: async (req, res) => {
    const { idCliente, datoMuestra, quienEntreMuestras, fechaRecepMuestras, recibeMuestras } = req.body

    try {

      const recepcion = new Recepcion({ idCliente, datoMuestra, quienEntreMuestras, fechaRecepMuestras, recibeMuestras })

      if (!recepcion) {
        res.status(400).json({ msg: "No se encontro" })
      }
      recepcion.save()
      res.json({ recepcion })

    } catch (error) {
      res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  recepcionGet: async (req, res) => {

    try {
      const recepcion = await Recepcion.find()

      if (!recepcion) {
        res.status(400).json({ msg: "No se encontro" })
      }

      res.json({ recepcion })

    } catch (error) {
      res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  recepcionGetFechaRecepcion: async (req, res) => {
    const { fechaRecepMuestras } = req.body;
    let fechaI = `${fechaRecepMuestras}T00:00:00.000-05:00`
    let fechaF = `${fechaRecepMuestras}T23:59:59.000-05:00`

    try {

      const recepcion = await Recepcion.find({
        $and: [
          {
            fechaRecepMuestras: {
              $gte: new Date(fechaI)
            }
          },
          {
            fechaRecepMuestras: {
              $lte: new Date(fechaF)
            }
          }
        ]
      }
      );

      if (!recepcion) {
        return res.status(400).json({ msg: "No se encontro" })
      }

      res.json({
        recepcion
      })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  recepcionPut: async (req, res) => {
    const { id } = req.params
    const { _id, idCliente, createdAt, quienEntreMuestras, recibeMuestras, ...resto } = req.body

    try {
      const modificar = await Recepcion.findByIdAndUpdate(id, resto);

      if (!modificar) {
        res.status(400).json({ msg: "No se encontro" })
      }

      res.json({
        modificar
      })

    } catch (error) {
      res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  }
}
export default RecepcionMuestra