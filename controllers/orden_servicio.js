import Orden from "../models/orden_servicio.js";
import helperBitacora from "../helpers/bitacora.js"

const Ordenes = {
  ordenGet: async (req, res) => {
    try {
      const orden = await Orden.find()
        .populate({
          path: "itemsorden.idensayo",
        })
        .populate({
          // path:"itemsorden.idensayo",
          // populate: {path:"responsables.titular"},
          path: "itemsorden.responsable",
          select: ["nombre"],
        })
        .populate({
          path: "itemsorden.supervisor",
          select: ["nombre"],
        })
        .populate({ path: "idMuestra" })
        .populate({ path: 'idMuestra', populate: { path: 'cotizacion' } });

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
      try {
        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Orden activada exitosamente, realizada por ${usuario.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
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

      try {
        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Orden inactivada exitosamente, realizada por ${usuario.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }

      res.json({
        desactivar,
      });
    } catch (error) {
      res.stataus(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  ordenPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, idMuestra, estado, ...resto } = req.body;

    const modificar = await Orden.findByIdAndUpdate(id, resto);
    if (!modificar) {
      return res.status(400).json({
        msg: "No se pudo agregar resultado e incertidumbre a la orden",
      });
    }
    try {

      const usuario = req.usuario
      const idPerson = usuario._id;
      const observacion = `Orden modificada exitosamente, realizada por ${usuario.nombre}`;
      helperBitacora.llenarBitacora(idPerson, observacion);
    } catch (error) {
      return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
    }

    res.json({ modificar });

  },
  informeDeResultados: async (req, res) => {
    const { id } = req.params;
    try {
      const informe = await Orden.findById(id)
        .populate({
          path: "idMuestra",
          populate: { path: "solicitante", populate: { path: "ciudad" } },
        })
        .populate({ path: "idMuestra", populate: { path: "munRecoleccion" } })
        .populate({
          path: "idMuestra",
          populate: { path: "cotizacion.items.item1.itemsEnsayo" },
        })
        .populate({ path: "idMuestra", populate: { path: "tipoMuestra" } })
        .populate({
          path: "itemsorden.idensayo",
        });

      if (!informe) {
        res.status(400).json({ msg: "No se encontro lo buscado" });
      }

      res.json({ informe });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  lismamu: async (req, res) => {
    try {
      const lismamu = await Orden.find()
        .populate({ path: 'idMuestra', populate: { path: 'solicitante' } })
        .populate({ path: 'idMuestra', populate: { path: 'cotizacion' } })
        .populate({ path: 'idMuestra', populate: { path: 'tipoMuestra' } })
        .populate({ path: 'idMuestra', populate: { path: 'solicitante', populate: { path: 'ciudad' } } })
        .populate({ path: 'idMuestra', populate: { path: 'munRecoleccion' } });

      if (!lismamu) {
        res.status(400).json({ msg: "No se encontro lo buscado" });
      }

      res.json({ lismamu });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  semaforo: async (req, res) => {
    try {
      const fecha = await Orden.find()
        .populate({ path: 'idMuestra', populate: { path: 'cotizacion' } })

      res.json({ fecha })

      let fechaActual = new Date();
      console.log("fecha Actual: " + fechaActual);
      let entrega = new Date(fecha[2].idMuestra.cotizacion.entregaResultados);
      console.log("entrega de resultados: " + entrega);
      console.log("resta: " + (fechaActual - entrega));

      const diffInDays = Math.floor((fechaActual - entrega) / (1000 * 60 * 60 * 24));
      console.log("fecha total: " + diffInDays);

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  }
};
export default Ordenes;
