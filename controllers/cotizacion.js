import Cotizacion from "../models/cotizacion.js";
import Setup from "../models/setup.js";

const cotizacion = {
  cotizacionPost: async (req, res) => {
    const {
      fechaEmision,
      idCliente,
      idContacto,
      validezOferta,
      entregaResultados,
      idElaboradoPor,
      items,
      observaciones,
      subTotal,
      descuento,
      iva,
      total,
    } = req.body;
    try {
      const consecutivo = await Setup.findOne();
      let conse = "";
      if (consecutivo.consecutivoOferta.toString().length == 1) {
        conse = `000${consecutivo.consecutivoOferta}`;
      } else if (consecutivo.consecutivoOferta.toString().length == 2) {
        conse = `00${consecutivo.consecutivoOferta}`;
      } else if (consecutivo.consecutivoOferta.toString().length == 3) {
        conse = `0${consecutivo.consecutivoOferta}`;
      } else {
        conse = consecutivo.consecutivoOferta;
      }
      const d = new Date();
      let year = d.getFullYear();
      let cotiNumero = "".concat(conse, "-", year, "V1");
      /* console.log(''.concat(conse,'-',year,'V1')); */
      console.log("conca: " + cotiNumero);
      /* consecutivo.consecutivoOferta++ */
      let consecutivooferta = consecutivo.consecutivoOferta+1;
      const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
        consecutivoOferta: consecutivooferta,
      });
      if (!guardar) {
        return res
          .status(400)
          .json({
            msg: "No se pudo actualizar la informacion del consecutivo oferta",
          });
      }
      const cotizacion = new Cotizacion({
        numCotizacion: cotiNumero,
        fechaEmision,
        idCliente,
        idContacto,
        validezOferta,
        entregaResultados,
        idElaboradoPor,
        items,
        observaciones,
        subTotal,
        descuento,
        iva,
        total,
      });
      if (!cotizacion) {
        return res
          .status(400)
          .json({ msg: "No se puedo registrar la oferta de servicio" });
      }
      cotizacion.save();
      res.json({ cotizacion });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el webMaster" });
    }
  },

  cotizacionPut: async (req, res) => {
    const { id } = req.params;

    const {
      fechaEmision,
      idCliente,
      idContacto,
      validezOferta,
      entregaResultados,
      idElaboradoPor,
      items,
      observaciones,
      subTotal,
      descuento,
      iva,
      total,
    } = req.body;
    try {
      const usuario = await Cotizacion.findByIdAndUpdate(id, { estado: 0 })
      if (!usuario) {
        return res
          .status(400)
          .json({ msg: "No se puedo registrar la oferta de servicio" });
      }
      let consecutivo = await Cotizacion.findById(id)
      let version = consecutivo.numCotizacion
      console.log(version.split('V')[1]);
      let primeraParte  = version.split('V')[0]
      let versionNew=Number(version.split('V')[1])+1
      console.log("version nueva"+versionNew);
      console.log("version"+version);
      let concaNueva = `${primeraParte}V${versionNew}`
      console.log(concaNueva);

      const cotizacion = new Cotizacion({
        numCotizacion: concaNueva,
        fechaEmision,
        idCliente,
        idContacto,
        validezOferta,
        entregaResultados,
        idElaboradoPor,
        items,
        observaciones,
        subTotal,
        descuento,
        iva,
        total,
      });

      cotizacion.save()
      res.json({ cotizacion });

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },

  cotizacionGet: async (req, res) => {
    try {
      const cotizacion = await Cotizacion.find();

      if (!cotizacion) {
        return res.status(400).json({ msg: "No se encontro nada" });
      }
      res.json({ cotizacion });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el webMaster" });
    }
  },

  listarCotizacion: async (req, res) => {
    const { numCotizacion } = req.body;
    try {
      const cotizacion = await Cotizacion.find({ numCotizacion });

      if (!cotizacion) {
        return res.status(400).json({ msg: "Numero de cotizacion incorrecto" });
      }
      res.json({ cotizacion });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },

  servicioGetFechaEmision: async (req, res) => {
    const { fechaEmision } = req.body;
    let fechaI = `${fechaEmision}T00:00:00.000-05:00`;
    let fechaF = `${fechaEmision}T23:59:59.000-05:00`;

    try {
      const cotizacion = await Cotizacion.find({
        $and: [
          {
            fechaEmision: {
              $gte: new Date(fechaI),
            },
          },
          {
            fechaEmision: {
              $lte: new Date(fechaF),
            },
          },
        ],
      });

      if (!cotizacion) {
        return res.status(400).json({ msg: "No se encontro" });
      }

      res.json({
        cotizacion,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
};

export default cotizacion;
