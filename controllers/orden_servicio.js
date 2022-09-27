import Orden from "../models/orden_servicio.js" ;

const Ordenes = {
  ordenGet: async (req, res) => {
    try {
      const orden = await Orden.find()
      .populate({
        path:'itemsorden.idensayo'
      })
      .populate({
        // path:"itemsorden.idensayo",
        // populate: {path:"responsables.titular"},
        path:'itemsorden.responsable',
        select: ['nombre']
      })
      .populate({
        path:"itemsorden.supervisor",
        select :['nombre']
      })

      if (!orden) {
        return res
          .status(400)
          .json({ msg: "No se encontro la orden del servicio" });
      }
      res.json({ orden });
    } catch (error) {
      res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  ordenActivar: async (req, res) => {
    const { id } = req.params;
    try {
      const activar = await Orden.findByIdAndUpdate(id, { estado: 1 });
      if (!activar) {
        res.status(400).json({ msg: "No se actualizo el estado" });
      }
      res.json({
        activar,
      });
    } catch (error) {
      res.stataus(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  ordenDesactivar: async (req, res) => {
    const { id } = req.params;
    try {
      const desactivar = await Orden.findByIdAndUpdate(id, { estado: 0 });
      if (!desactivar) {
        res.status(400).json({ msg: "No se actualizo el estado" });
      }
      res.json({
        desactivar,
      });
    } catch (error) {
      res.stataus(500).json({ msg: "Hable con el WebMaster" });
    }
  },
};

export default Ordenes;
