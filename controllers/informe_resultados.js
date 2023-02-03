import Resultado from "../models/informe_resultado.js";
import Setup from "../models/setup.js";

const resultado = {
  resultadoPost: async (req, res) => {
    const { idMuestra, fechaEmisionInforme, analisisMuestra, observaciones } =
      req.body;
    try {
      const consecutivo = await Setup.findOne();
      console.log("consecutivo informe: " + consecutivo.iva);
      let conse = "";
      if (consecutivo.consecutivoInforme.toString().length == 1) {
        conse = `000${consecutivo.consecutivoInforme}`;
      } else if (consecutivo.consecutivoInforme.toString().length == 2) {
        conse = `00${consecutivo.consecutivoInforme}`;
      } else if (consecutivo.consecutivoInforme.toString().length == 3) {
        conse = `0${consecutivo.consecutivoInforme}`;
      } else {
        conse = consecutivo.consecutivoInforme;
      }
      const d = new Date();
      let year = d.getFullYear();
      let cotiNumero = "".concat(conse, "-", year);
      console.log("conca: " + cotiNumero);
      let consecutivoinforme = consecutivo.consecutivoInforme + 1;
      const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
        consecutivoInforme: consecutivoinforme,
      });
      if (!guardar) {
        return res.status(400).json({
          msg: "No se pudo actualizar la informacion del consecutivo informe de resultados",
        });
      }

      const resultado = new Resultado({
        idMuestra,
        informeResulNumero: cotiNumero,
        fechaEmisionInforme,
        analisisMuestra,
        observaciones,
      });

      if (!resultado) {
        return res
          .status(400)
          .json({ msg: "no se pudo registrar el resultado" });
      }
      resultado.save();
      res.json({
        resultado,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  resultadoGetFechaEmi: async (req, res) => {
    const { fechaEmisionInforme } = req.body;
    let fechaI = `${fechaEmisionInforme}T00:00:00.000-05:00`;
    let fechaF = `${fechaEmisionInforme}T23:59:59.000-05:00`;
    try {
      const resultado = await Resultado.find({
        $and: [
          {
            fechaEmisionInforme: {
              $gte: new Date(fechaI),
              $lt: new Date(fechaF),
            },
          },
        ],
      });
      if (!resultado) {
        return res.status(400).json({ msg: "No se encontro" });
      }
      res.json({
        resultado,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  resultadoGet: async (req, res) => {
    try {
      const resultados = await Resultado.find();
      if (!resultados) {
        return res.status(400).json({
          msg: "No hay informes de resultados",
        });
      }
      res.json({ resultados });
    } catch (error) {
      return res.status(500).json({
        msg: "Hable con el WebMaster",
      });
    }
  },
  resultadoPut: async (req, res) => {
    const { id } = req.params
    const { _id, createdAt, ...resto } = req.body;
    try {
        const modificar = await Resultado.findByIdAndUpdate(id, resto);
        if (!modificar) {
            return res.status(500).json({ msg: "No se pudo actualizar la informacion del informe de resultados" })
        }
        res.json({
            modificar
        })
    } catch (error) {
        return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  }
};

export default resultado;
