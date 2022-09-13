import Muestra from "../models/muestra.js";
import Setup from "../models/setup.js";

const muestra = {
  muestraPost: async (req, res) => {
    const {
      solicitante,
      contacto,
      munRecoleccion,
      direccionTomaMuestra,
      lugarTomaMuestra,
      muestraRecolectadaPor,
      procedimientoMuestreo,
      tipoMuestra,
      matrizMuestra,
      fechaRecoleccion,
      cotizacion,
      item,
    } = req.body;

    try {
      const consecutivo = await Setup.findOne();
      let conse = "";
      if (consecutivo.consecutivoMuestra.toString().length == 1) {
        conse = `000${consecutivo.consecutivoMuestra}`;
      } else if (consecutivo.consecutivoMuestra.toString().length == 2) {
        conse = `00${consecutivo.consecutivoMuestra}`;
      } else if (consecutivo.consecutivoMuestra.toString().length == 3) {
        conse = `0${consecutivo.consecutivoMuestra}`;
      } else {
        conse = consecutivo.consecutivoOferta;
      }
      const d = new Date();
      let year = d.getFullYear();
      let cotiNumero = "".concat(conse, "-", year);
      console.log(cotiNumero);

      let consecutivoMuestra = consecutivo.consecutivoMuestra+1;
      const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
        consecutivoMuestra: consecutivoMuestra,
      });
      if (!guardar) {
        return res
          .status(400)
          .json({
            msg: "No se pudo actualizar la informacion del consecutivo muestra",
          });
      }
      const muestra = new Muestra({
        solicitante,
        contacto,
        codMuestra:cotiNumero,
        munRecoleccion,
        direccionTomaMuestra,
        lugarTomaMuestra,
        muestraRecolectadaPor,
        procedimientoMuestreo,
        tipoMuestra,
        matrizMuestra,
        fechaRecoleccion,
        cotizacion,
        item,
      });
      if (!muestra) {
        return res.status(400).json({ msg: "no se pudo registrar la muestra" });
      }
      muestra.save();
      res.json({ muestra });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },

  muestraGet: async (req, res) => {
    try {
      const muestra = await Muestra.find();

      if (!muestra) {
        return res.status(400).json({ msg: "No hay muestras" });
      }
      res.json({ muestra });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },

  muestraGetMunicipio: async (req, res) => {
    const { municipio } = req.body;

    try {
      const muestra = await Muestra.find({
        $or: [{ munRecoleccion: new RegExp(municipio, "i") }],
      });

      if (!muestra) {
        return res.json({ msg: "No se encontro lo buscado" });
      }
      res.json({ muestra });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },

  muestraGetLugar: async (req, res) => {
    const { lugar } = req.body;

    try {
      const muestra = await Muestra.find({
        $or: [{ lugarTomaMuestra: new RegExp(lugar, "i") }],
      });

      if (!muestra) {
        return res.status(400).json({ msg: "No se encontro lo buscado" });
      }
      res.json({ muestra });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },

  muestraGetTipo: async (req, res) => {
    const { tipoMuestra } = req.body;

    try {
      const muestra = await Muestra.find({
        $or: [{ tipoMuestra: new RegExp(tipoMuestra, "i") }],
      });
      if (!muestra) {
        return res.status(400).json({ msg: "No se encontro lo buscado" });
      }
      res.json({ muestra });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },

  muestraGetLisMaMu: async (req, res) => {
    try {
      muestra = await Muestra.find()
        .populate("solicitante", [
          "nombre",
          "documento",
          "direccion",
          "contacto",
          "telefono",
          "correo",
        ])
        .populate("munRecoleccion", ["ciudad", "departamento"]);

      if (!muestra) {
        return res.status(400).json({ msg: "No se encontro lo buscado" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },

  muestraActivar: async (req, res) => {
    const { id } = req.params;
    const muestra = await Muestra.findByIdAndUpdate(id, { estado: 1 });
    res.json({
      muestra,
    });
  },

  muestraDesactivar: async (req, res) => {
    const { id } = req.params;
    const muestra = await Muestra.findByIdAndUpdate(id, { estado: 0 });
    res.json({
      muestra,
    });
  },
};

export default muestra;

