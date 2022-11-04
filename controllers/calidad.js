import Calidad from "../models/calidad.js";

const calidad = {
  calidadPost: async (req, res) => {
    const { formato, codigo, aprobacion, version } = req.body;
    try {
      const calidad = new Calidad({ formato, codigo, aprobacion, version });
      if (!calidad) {
        return res.status(400).json({ msg: "no se pudo registrar" });
      }
      calidad.save();
      res.json({
        calidad,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  calidadPut: async (req, res) => {
    const { id } = req.params
    const { _id, createdAt, estado, ...resto } = req.body;
    try {
      const modificar = await Calidad.findByIdAndUpdate(id, resto);
      if (!modificar) {
        return res.status(500).json({ msg: "No se pudo actualizar la informacion" })
      }
      res.json({
        modificar
      })
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
  calidadGet: async (req, res) => {
    try {
      const calidad = await Calidad.find();
      if (!calidad) {
        return res.status(400).json({ msg: "no se pudo registrar" });
      }
      res.json({
        calidad,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  calidadNombre: async (req, res) => {
    const { nombre } = req.body;
    try {
      const calidad = await Calidad.find({
        $or: [{ formato: new RegExp(nombre, "i") }],
      });
      if (!calidad) {
        return res.status(400).json({
          ms: "Formato no encontrado",
        });
      }
      res.json({ calidad });
    } catch (error) {
      return res.status(500).json({
        msg: "Hable con el WebMaster",
      });
    }
  }
};

export default calidad;
