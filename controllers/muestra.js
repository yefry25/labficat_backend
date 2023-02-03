import Muestra from "../models/muestra.js";
import Setup from "../models/setup.js";
import Ensayo from "../models/ensayo.js";
import Usuario from "../models/usuario.js";
import Orden from "../models/orden_servicio.js";
import Cotizacion from "../models/cotizacion.js";
import transporter from "../database/mailer.js";
import helperBitacora from "../helpers/bitacora.js";
import tools from "../helpers/tools.js";

const muestra = {
  muestraPost: async (req, res) => {
    const {
      solicitante,
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

    /* tools.consecutivos().then((nu)=>{
      console.log("consecutivo: "+nu);
    }) */
    try {
      /* let conse = "";
      if (consecutivo.consecutivoMuestra.toString().length == 1) {
        conse = `000${consecutivo.consecutivoMuestra}`;
      } else if (consecutivo.consecutivoMuestra.toString().length == 2) {
        conse = `00${consecutivo.consecutivoMuestra}`;
      } else if (consecutivo.consecutivoMuestra.toString().length == 3) {
        conse = `0${consecutivo.consecutivoMuestra}`;
      } else {
        conse = consecutivo.consecutivoOferta;
      } */
      const conse = await tools.consecutivoMuestra()
      const d = new Date();
      let year = d.getFullYear();
      /* let cotiNumero = "".concat(conse, "-", year); */
      let cotiNumero = `${conse}-${year}`
      /* console.log(cotiNumero); */

      try {
        const consecutivo = await Setup.findOne();
        let consecutivoMuestra = consecutivo.consecutivoMuestra + 1;
        const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
          consecutivoMuestra: consecutivoMuestra,
        });
        if (!guardar) {
          return res.status(400).json({
            msg: "No se pudo actualizar la informacion del consecutivo muestra",
          });
        }
      } catch (error) {
        return res.status(504).json({ msg: "Hable con el WebMaster" })
      }
      const muestra = new Muestra({
        solicitante,
        codMuestra: cotiNumero,
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

      try {
        const email = await Usuario.findById(solicitante)
        /* console.log("persona: " + email.correo); */
        await transporter.sendMail({
          from: '"Muestra creada" <jefabecerra@misena.edu.co>', // sender address
          to: email.correo, // list of receivers
          subject: "La muestra fue creada exitosamente", // Subject line
          html: `La matriz de tu muestra creada es: ${muestra.matrizMuestra}`, // html body
        });

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo enviar el correo" })
      }

      const cotizacion1 = await Cotizacion.findById(cotizacion);
      let cotilla = "";
      if (item == "Item1") {
        cotilla = cotizacion1.items.item1.itemsEnsayo;
      } else if (item == "Item2") {
        cotilla = cotizacion1.items.item2.itemsEnsayo;
      } else {
        cotilla = cotizacion1.items.item3.itemsEnsayo;
      }
      const itemsOrden = [];

      try {
        for (let i = 0; i < cotilla.length; i++) {
          const elemento = cotilla[i];
          /* console.log("ensayo: " + elemento); */
          const itemOrden = {};
          itemOrden.idensayo = elemento.ensayo;

          const person = await Ensayo.findById(elemento.ensayo)
            .populate({ path: "responsables.titular" })
            .populate({ path: "responsables.suplente" });

          if (
            person.responsables.titular.estado == 0 ||
            person.responsables.titular.estado == 2
          ) {
            console.log("suplente por inactividad: ");
            if (
              person.responsables.suplente.estado == 0 ||
              person.responsables.suplente.estado == 2
            ) {
            } else {
              itemOrden.responsable = person.responsables.suplente._id;
            }
          } else {
            itemOrden.responsable = person.responsables.titular._id;
          }
          const supervisor = await Usuario.findOne({ rol: "Responsable de Calidad" });
          if (supervisor) {
            itemOrden.supervisor = supervisor._id;
          }
          itemsOrden.push(itemOrden);
        }
      } catch (error) {
        return res.status(500).json({ msg: "Falta responsables o el supervisor" });
      }

      try {

        const idMuestra = muestra._id;
        const orden = new Orden({ idMuestra, itemsorden: itemsOrden });
        /* console.log(itemsOrden); */
        orden.save();
        res.json({ orden });

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear la orden de servicio" })
      }

      try {

        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Muestra registrada exitosamente, realizada por ${usuario.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el Carlos" });
    }
  },
  muestraGet: async (req, res) => {
    try {
      const muestra = await Muestra.find()
        .populate({ path: "tipoMuestra" })
        .populate({ path: "munRecoleccion" })
        .populate({
          path: "solicitante",
          populate: { path: "ciudad", select: ["departamento", "Ciudad"] },
        })
        .populate({ path: "cotizacion" });
      if (!muestra) {
        return res.status(400).json({ msg: "No hay muestras" });
      }
      res.json({ muestra });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  muestraGetCliente: async (req, res) => {
    const { solicitante } = req.body;
    try {
      const muestra = await Muestra.find({ solicitante })
        .populate({
          path: "munRecoleccion",
          select: ["departamento", "Ciudad"],
        })
        .populate({ path: "tipoMuestra", select: ["tipos"] });
      if (!muestra) {
        return res.status(400).json({ msg: "No hay muestras" });
      }
      res.json({ muestra });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  muestraGetLisMaMu: async (req, res) => {
    try {
      const muestra = await Muestra.find({})
        .populate({
          path: "solicitante",
          populate: { path: "ciudad" },
        })
        .populate({
          path: "munRecoleccion",
          select: ["Ciudad", "departamento"],
        })
        .populate({ path: "tipoMuestra", select: ["tipos"] })
        .populate({ path: "cotizacion" });

      if (!muestra) {
        return res.status(400).json({ msg: "No se encontro lo buscado" });
      }
      res.json({ muestra });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  solsegrec: async (req, res) => {
    try {
      const muestra = await Muestra.find().populate({
        path: "solicitante",
        populate: { path: "ciudad" },
      });
      if (!muestra) {
        return res.status(400).json({ msg: "No se encontro lo buscado" });
      }
      res.json(muestra);
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  facturaMuestra: async (req, res) => {
    const { id } = req.body

    try {
      const muestra = await Muestra.findById(id)
        .populate({ path: "tipoMuestra" })
        .populate({ path: "munRecoleccion" });

      if (!muestra) {
        return res.status(400).json({ msg: "No se encontro lo buscado" });
      }
      res.json(muestra);
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  muestraPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, cotizacion, item, ...resto } = req.body;
    try {
      const modificar = await Muestra.findByIdAndUpdate(id, resto);
      if (!modificar) {
        return res
          .status(400)
          .json({ msg: "No se pudo actualizar la informacion de la muestra" });
      }

      const usuario = req.usuario
      const idPerson = usuario._id;
      const observacion = `Muestra modificada exitosamente, realizada por ${usuario.nombre}`;
      helperBitacora.llenarBitacora(idPerson, observacion);
      res.json({
        modificar,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  muestraActivar: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = req.usuario
      const muestra = await Muestra.findByIdAndUpdate(id, { estado: 1 });
      if (!muestra) {
        return res.status(400).json({ msg: "No se activo la muestra" });
      }
      const ordenes = await Orden.find();
      for (let i = 0; i < ordenes.length; i++) {
        const element = ordenes[i];
        if (element.idMuestra == id) {
          const orden = await Orden.findByIdAndUpdate(element._id, {
            estado: 1,
          });

          const idPerson = usuario._id;
          const observacion = `Orden activada exitosamente, realizada por ${usuario.nombre}`;
          helperBitacora.llenarBitacora(idPerson, observacion);
          if (!orden) {
            return res
              .status(400)
              .json({ msg: "No se pudo habilitar la orden" });
          }
        }
      }

      const idPerson = usuario._id;
      const observacion = `Muestra activada exitosamente, realizada por ${usuario.nombre}`;
      helperBitacora.llenarBitacora(idPerson, observacion);
      res.json({
        muestra,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  muestraDesactivar: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = req.usuario
      const muestra = await Muestra.findByIdAndUpdate(id, { estado: 0 });
      if (!muestra) {
        return res.status(400).json({ msg: "No se desactivo la muestra" });
      }
      const ordenes = await Orden.find();
      for (let i = 0; i < ordenes.length; i++) {
        const element = ordenes[i];
        if (element.idMuestra == id) {
          const orden = await Orden.findByIdAndUpdate(element._id, {
            estado: 0,
          });

          const idPerson = usuario._id;
          const observacion = `Orden inactivada exitosamente, realizada por ${usuario.nombre}`;
          helperBitacora.llenarBitacora(idPerson, observacion);
          if (!orden) {
            return res
              .status(400)
              .json({ msg: "No se pudo inhabilitar la orden" });
          }
        }
      }

      const idPerson = usuario._id;
      const observacion = `Muestra inactivada exitosamente, realizada por ${usuario.nombre}`;
      helperBitacora.llenarBitacora(idPerson, observacion);
      res.json({
        muestra,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
};
export default muestra;
