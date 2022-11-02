import Ensayo from "../models/ensayo.js";
import helperBitacora from '../helpers/bitacora.js'

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

      try {
        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Registro exitoso del ensayo ${ensayos.ensayo} realizado por ${usuario.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }
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
    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;
    try {
      const modificar = await Ensayo.findByIdAndUpdate(id, resto);
      if (!modificar) {
        return res
          .status(500)
          .json({ msg: "No se pudo actualizar la informacion del usuario" });
      }

      try {
        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Ensayo modificado exitosamente, realizado por ${usuario.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);
      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }
      res.json({
        modificar,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  ensayoActivar: async (req, res) => {
    const { id } = req.params;
    try {
      const activar = await Ensayo.findByIdAndUpdate(id, { estado: 1 });
      if (!activar) {
        res.status(400).json({ msg: "No se actualizo el estado" });
      }

      try {
        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Ensayo activado exitosamente, realizado por ${usuario.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);
        res.json({
          activar,
        });

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }

    } catch (error) {
      res.stataus(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  ensayoDesactivar: async (req, res) => {
    const { id } = req.params;
    try {
      const desactivar = await Ensayo.findByIdAndUpdate(id, { estado: 0 });
      if (!desactivar) {
        res.status(400).json({ msg: "No se actualizo el estado" });
      }

      try {
        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Ensayo desactivado exitosamente, realizado por ${usuario.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);
        res.json({
          desactivar,
        });

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }

    } catch (error) {
      res.stataus(500).json({ msg: "Hable con el WebMaster" });
    }
  },
};

export default ensayo;
