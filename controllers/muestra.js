import Muestra from "../models/muestra.js";
import Setup from "../models/setup.js";
import Ensayo from "../models/ensayo.js";
import Usuario from "../models/usuario.js";
import Orden from "../models/orden_servicio.js";
import Cotizacion from "../models/cotizacion.js";

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

    let consecutivoMuestra = consecutivo.consecutivoMuestra + 1;
    const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
      consecutivoMuestra: consecutivoMuestra,
    });
    if (!guardar) {
      return res.status(400).json({
        msg: "No se pudo actualizar la informacion del consecutivo muestra",
      });
    }

    const muestra = new Muestra({
      solicitante,
      contacto,
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
    console.log(cotizacion);
    const cotizacion1 = await Cotizacion.findById(cotizacion);
    let cotilla = cotizacion1.items.item1.itemsEnsayo;
    //item??
    let usuarios = "";
    let ensayo = "";
    let supervisores = "";
    for (let i = 0; i < cotilla.length; i++) {
      const element = cotilla[i];
      /*  console.log(element.items.item1.itemsEnsayo); */
      for (let i = 0; i < cotilla.length; i++) {
        const elemento = cotilla[i];

        ensayo = elemento.ensayo;
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
            usuarios = "";
          }
        } else {
          usuarios = person.responsables.titular._id;
        }
        /* console.log("id titular: "+person.responsables.titular._id); */

        const supervisor = await Usuario.find({ rol: "supervisor" });
        console.log("super: " + supervisor);
        supervisores = supervisor[0]._id;
      }
    }

    const ordes = new Orden({
      idMuestra: muestra._id,
      itemsorden: [
        {
          idensayo: ensayo,
          responsable: usuarios,
          supervisor: supervisores,
        },
      ],
    });
    ordes.save();

    console.log('id de la orden: '+ordes._id);
    /* const modificarOrden = await Orden.findByIdAndUpdate(ordes._id, {
      $push: {
        'itemsorden': 
            {
              idensayo: ensayo,
              responsable: usuarios,
              supervisor: supervisores,
              resultado:0,
              incertidumbre:0,
              estado:'en proceso'
            }
      },
    });
    res.json({ modificarOrden }); */

    const moda = await Orden.updateMany({_id:ordes._id},
      {$push:{
        itemsorden:{
          $each:[{
              idensayo: ensayo,
              responsable: usuarios,
              supervisor: supervisores,
              resultado:0,
              incertidumbre:0,
              estado:'en proceso'
          }]
        }
      }
      })

      res.json({moda})
    /* const cotizacion = await Ensayo.find();
      console.log(ensayo);
      const usuario = await Usuario.findOne();
      console.log(ensayo._id);
      const ordes = new Orden({
        idMuestra: muestra._id,
        itemsorden: [
          {
            idensayo: ensayo._id,
            responsable: usuario._id,
            supervisor: usuario._id,
          },
        ],
      });
      ordes.save();
      console.log("ordes", ordes); */

    console.log("usuarios: " + usuarios);
    console.log("ensayos: " + ensayo);
    console.log("supervisores: " + supervisores);
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
        .populate({ path: "tipoMuestra", select: ["tipos"] });
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
      const muestra = await Muestra.find()
        .populate({
          path: "solicitante",
          populate: { path: "ciudad" },
        })
        .populate({
          path: "contacto",
          select: ["nombre", "telefono", "correo"],
        });

      if (!muestra) {
        return res.status(400).json({ msg: "No se encontro lo buscado" });
      }
      res.json(muestra);
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  muestraPut: async (req, res) => {
    /* const { id } = req.params;
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
    } = req.body; */

    /* const consecutivo = await Setup.findOne();
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

      let consecutivoMuestra = consecutivo.consecutivoMuestra + 1;
      const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
        consecutivoMuestra: consecutivoMuestra,
      });
      if (!guardar) {
        return res.status(400).json({
          msg: "No se pudo actualizar la informacion del consecutivo muestra",
        });
      }

      const muestras = await Muestra.findByIdAndUpdate(id, { estado: 0 });
      if (!muestras) {
        return res
          .status(400)
          .json({ msg: "No se puedo registrar la oferta de servicio" });
      }

      const muestra = new Muestra({
        solicitante,
        contacto,
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

      const ordenes = await Orden.find();

      for (let i = 0; i < ordenes.length; i++) {
        const element = ordenes[i];

        if (element.idMuestra == id) {
          const orden = await Orden.findByIdAndUpdate(element._id, {
            estado: 0,
          });
          if (!orden) {
            return res
              .status(400)
              .json({ msg: "No se pudo inhabilitar la orden" });
          }
        }
      }

      const ensayo = await Ensayo.findOne();
      const usuario = await Usuario.findOne();
      console.log(ensayo._id);
      const ordes = new Orden({
        idMuestra: muestra._id,
        itemsorden: [
          {
            idensayo: ensayo._id,
            responsable: usuario._id,
            supervisor: usuario._id,
          },
        ],
      });
      ordes.save();
      console.log("ordes", ordes);
      res.json({ muestra }); */

    const { id } = req.params;
    const { _id, createdAt, cotizacion, item, ...resto } = req.body;
    try {
      const modificar = await Muestra.findByIdAndUpdate(id, resto);
      if (!modificar) {
        return res
          .status(400)
          .json({ msg: "No se pudo actualizar la informacion de la muestra" });
      }
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
          if (!orden) {
            return res
              .status(400)
              .json({ msg: "No se pudo habilitar la orden" });
          }
        }
      }
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
          if (!orden) {
            return res
              .status(400)
              .json({ msg: "No se pudo inhabilitar la orden" });
          }
        }
      }
      res.json({
        muestra,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
};
export default muestra;
