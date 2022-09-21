import Ensayo from "../models/ensayo.js";

const ensayo = {
  ensayoPost: async (req, res) => {
    const {
      ensayo,
      metodo,
      tecnica,
      valorMinimo,
      valorMaximo,
      unidades,
      costo,
      descripcion,
      limiteCuantificacion,
      responsables,
    } = req.body;
    try {
      const ensayos = new Ensayo({
        ensayo,
        metodo,
        tecnica,
        valorMinimo,
        valorMaximo,
        unidades,
        costo,
        descripcion,
        limiteCuantificacion,
        responsables,
      });
      if (!ensayos) {
        return res
          .status(400)
          .json({ msg: "No se puedo registrar los ensayos" });
      }
      ensayos.save();
      res.json({
        ensayos,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el webMaster" });
    }
  },

  ensayoGet: async (req, res) => {
    try {
      const ensayos = await Ensayo.find();

      if (!ensayos) {
        return res.status(400).json({ msg: "No se encontro nada" });
      }
      res.json({ ensayos });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el webMaster" });
    }
  },

  ensayoPut: async (req, res) => {
    const { id } = req.params
    const { _id, estado, ...resto } = req.body;
    try {
        const modificar = await Ensayo.findByIdAndUpdate(id, resto);
        if (!modificar) {
            return res.status(500).json({ msg: "No se pudo actualizar la informacion del usuario" })
        }
        res.json({
            modificar
        })
    } catch (error) {
        return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
},
};

export default ensayo;
