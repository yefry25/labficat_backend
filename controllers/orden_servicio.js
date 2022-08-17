import Orden from "../models/orden_servicio.js"

const Ordenes = {
  ordenPost: async (req, res) => {
    const { idMuestra, ensayo, realizadoPor, supervisadoPor, observaciones } = req.body
    try {
      const orden = new Orden({ idMuestra, ensayo, realizadoPor, supervisadoPor, observaciones })

      if (!orden) {
        res.status(400).json({ msg: "No se puedo registrar la orden" })
      }
      orden.save()
      res.json({ orden })

    } catch (error) {
      res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  ordenGet: async (req, res) => {
    try {

      const orden = await Orden.Find()

      if (!orden) {
        res.json(400).json({ msg: "No se encontro" })
      }

      res.json({ orden })

    } catch (error) {
      res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
  ordenGetRealizado: async (req, res) => {
    const { realizadoPor } = req.body
    try {
      const realizado = await Orden.findById({ realizadoPor })
      if (!realizado) {
        res.status(400).json({ msg: "No se encontro" })
      }
      res.json({ realizado })
    } catch (error) {
      res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  ordenGetSupervisado: async (req, res) => {
    const { supervisadoPor } = req.body
    try {
      const supervisado = await Orden.findById({ supervisadoPor })
      if (!supervisado) {
        res.status(400).json({ msg: "No se encontro" })
      }
      res.json({ supervisado })
    } catch (error) {
      res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  ordenActivar: async (req, res) => {
    const { id } = req.params;
    try {
      const activar = await Orden.findByIdAndUpdate(id, { estado: 1 })
      if (!activar) {
        res.status(400).json({ msg: "No se actualizo el estado" })
      }
      res.json({
        activar
      })
    } catch (error) {
      res.stataus(500).json({ msg: "Hable con el WebMaster" })
    }
  },

  ordenDesactivar: async (req, res) => {
    const { id } = req.params;
    try {
      const desactivar = await Orden.findByIdAndUpdate(id, { estado: 0 })
      if (!desactivar) {
        res.status(400).json({ msg: "No se actualizo el estado" })
      }
      res.json({
        desactivar
      })
    } catch (error) {
      res.stataus(500).json({ msg: "Hable con el WebMaster" })
    }
  },
}

export default Ordenes