import Cotizacion from "../models/cotizacion.js";
import Usuario from "../models/usuario.js"
import Setup from "../models/setup.js";
import helperBitacora from '../helpers/bitacora.js'
import tools from "../helpers/tools.js";
import transporter from "../database/mailer.js";
import excel4node from "excel4node";
import path from "path";

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
      descuento,
    } = req.body;

    try {

      const dale = items.item1.itemsEnsayo.reduce((acc, it) => {
        return (acc += it.costoEnsayo);
      }, 0);
      items.item1.costo = dale;
      items.costoItem = items.item1.costo;
      if (items.item2) {
        const dale = items.item2.itemsEnsayo.reduce((acc, it) => {
          return (acc += it.costoEnsayo);
        }, 0);
        items.item2.costo = dale;
        items.costoItem += items.item2.costo
      };
      if (items.item3) {
        const dale = items.item3.itemsEnsayo.reduce((acc, it) => {
          return (acc += it.costoEnsayo);
        }, 0);
        items.item3.costo = dale;
        items.costoItem += items.item3.costo
      };

      let sub = items.costoItem - descuento
      const consecutivo = await Setup.findOne();
      let to = Math.round(sub + sub * (consecutivo.iva / 100))
      /* let conse = "";
      if (consecutivo.consecutivoOferta.toString().length == 1) {
        conse = `000${consecutivo.consecutivoOferta}`;
      } else if (consecutivo.consecutivoOferta.toString().length == 2) {
        conse = `00${consecutivo.consecutivoOferta}`;
      } else if (consecutivo.consecutivoOferta.toString().length == 3) {
        conse = `0${consecutivo.consecutivoOferta}`;
      } else {
        conse = consecutivo.consecutivoOferta;
      } */
      const conse = await tools.consecutivoCotizacion();
      const d = new Date();
      let year = d.getFullYear();
      /* let cotiNumero = "".concat(conse, "-", year, "V1"); */
      let cotiNumero = `${conse}-${year}V1`

      try {
        let consecutivooferta = consecutivo.consecutivoOferta + 1;
        const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
          consecutivoOferta: consecutivooferta,
        });
        if (!guardar) {
          return res.status(400).json({
            msg: "No se pudo actualizar la informacion del consecutivo oferta",
          });
        }

      } catch (error) {
        return res.status(504).json({ msg: "Hable con el WebMaster" })
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
        subTotal: items.costoItem,
        descuento,
        iva: consecutivo.iva,
        total: to,
      });
      if (!cotizacion) {
        return res
          .status(400)
          .json({ msg: "No se puedo registrar la oferta de servicio" });
      }
      cotizacion.save();

      try {
        const email = await Usuario.findById(idCliente)
        /* console.log("persona: " + email.correo); */
        await transporter.sendMail({
          from: '"Cotización creada" <jefabecerra@misena.edu.co>', // sender address
          to: email.correo, // list of receivers
          subject: "La cotización fue creada exitosamente", // Subject line
          html: `El consecutivo de la cotización creada es: ${cotizacion.numCotizacion}`, // html body
        });

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo enviar el correo" })
      }

      try {
        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Cotizacion registrada exitosamente, realizada por ${usuario.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);
        res.json({ cotizacion });

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }

    } catch (error) {
      return res.status(500).json({ msg: "Habe con el WebMaster" })
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
      descuento,
    } = req.body;
    try {
      // con los reduce realizo las sumas de los costos de los items
      const dale = items.item1.itemsEnsayo.reduce((acc, it) => {
        return (acc += it.costoEnsayo);
      }, 0);
      items.item1.costo = dale;
      items.costoItem = items.item1.costo;
      if (items.item2) {
        const dale = items.item2.itemsEnsayo.reduce((acc, it) => {
          return (acc += it.costoEnsayo);
        }, 0);
        items.item2.costo = dale;
        items.costoItem += items.item2.costo
      };
      if (items.item3) {
        const dale = items.item3.itemsEnsayo.reduce((acc, it) => {
          return (acc += it.costoEnsayo);
        }, 0);
        items.item3.costo = dale;
        items.costoItem += items.item3.costo
      };
      /* console.log("costo del item: " + items.costoItem); */
      let sub = items.costoItem - descuento
      /* console.log("subtotal: " + sub); */
      const consecutivoSetup = await Setup.findOne();
      /* console.log("iva: " + consecutivoSetup.iva); */
      let to = Math.round(sub + sub * (consecutivoSetup.iva / 100))

      let concaNueva = "";
      try {
        const usuario = await Cotizacion.findByIdAndUpdate(id, { estado: 0 });
        if (!usuario) {
          return res
            .status(400)
            .json({ msg: "No se puedo registrar la oferta de servicio" });
        }
        let consecutivo = await Cotizacion.findById(id);
        let version = consecutivo.numCotizacion;
        let primeraParte = version.split("V")[0];
        let versionNew = Number(version.split("V")[1]) + 1;
        concaNueva = `${primeraParte}V${versionNew}`;
      } catch (error) {
        return res.status(500).json({ msg: "Ocurrió un error" })
      }
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
        subTotal: items.costoItem,
        descuento,
        iva: consecutivoSetup.iva,
        total: to,
      });
      if (!cotizacion) {
        return res
          .status(400)
          .json({ msg: "No se puedo actualizar la oferta de servicio" });
      }
      cotizacion.save();

      try {
        const user = req.usuario
        const idPerson = user._id;
        const observacion = `Cotizacion modificada exitosamente, realizada por ${user.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);
        res.json({ cotizacion });
      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  cotizacionGet: async (req, res) => {
    try {
      const cotizacion = await Cotizacion.find()
        .populate({ path: 'idCliente', populate: { path: 'ciudad', select: ['departamento', 'Ciudad'] } })
        .populate({ path: 'idElaboradoPor', populate: { path: 'ciudad' } })
        .populate({ path: 'items.item1.itemsEnsayo.ensayo' })
        .populate({ path: 'items.item2.itemsEnsayo.ensayo' })
        .populate({ path: 'items.item3.itemsEnsayo.ensayo' });

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
  solsegrec: async (req, res) => {
    try {

      const cotizacion = await Cotizacion.find()
        .populate({ path: 'idCliente', populate: { path: 'ciudad' } })
        .populate({ path: 'idElaboradoPor' });
      if (!cotizacion) {
        return res.status(400).json({ msg: "No se encontro lo buscado" });
      }

      res.json(cotizacion)

      const libro = new excel4node.Workbook({
        dateFormat: 'yyyy/mm/dd'
      });
      const hoja = libro.addWorksheet('libro');

      hoja.cell(1, 1).string('Fecha');
      hoja.cell(1, 2).string('Código cotización');
      hoja.cell(1, 3).string('Datos del contacto');
      hoja.cell(1, 4).string('Solicitud');
      hoja.cell(1, 5).string('Medio de solicitud');
      hoja.cell(1, 6).string('Recibido por');
      hoja.cell(1, 7).string('Porcentaje de aceptación');
      hoja.cell(1, 8).string('Registro de aceptación');
      hoja.cell(1, 9).string('Motivo de rechazo');
      hoja.cell(1, 10).string('Seguimiento de cotizaciones');

      hoja.cell(2, 1).string('Fecha');
      hoja.cell(2, 2).string('Código de cotización');
      hoja.cell(2, 3).string('Cliente');
      hoja.cell(2, 3).string('NIT/CC');
      hoja.cell(2, 3).string('Dirección');
      hoja.cell(2, 3).string('Ciudad');
      hoja.cell(2, 3).string('Departamento'); 
      hoja.cell(2, 3).string('Teléfono');

      hoja.cell(2,4).formula('="first line"&CHAR(10)&"second line"');
 
      const style = libro.createStyle({ 
        alignment: { 
          wrapText: true, 
        },
      })
      hoja.cell(4, 2).string('new\nline').style(style)
 
      const __dirname = path.resolve();
      const pathExcel = path.join(__dirname, 'excel', 'Libro3.xlsx')

      libro.write(pathExcel, (err, stats) => {
        if (err) {
          console.log(err)
        } else {
          let downloadFile = () => {
            res.download(pathExcel)
          }
          downloadFile();
          return false;
        }
      });

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
  servicioGetFechaEmision: async (req, res) => {
    const { fechaEmision } = req.body;

    let fechaI = `${fechaEmision}T00:00:00.000-05:00`;
    let fechaF = `${fechaEmision}T23:59:59.000-05:00`;
    console.log('fecha incial: ' + fechaI);
    console.log('fecha final: ' + fechaF);

    try {
      const cotizacion = await Cotizacion.find({
        $and: [{ fechaEmision: { $gte: new Date(fechaI), $lt: new Date(fechaF) } }]
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
  cotizacionGetCliente: async (req, res) => {
    const { idCliente } = req.body
    try {
      const cotizacion = await Cotizacion.find({ idCliente });
      if (!cotizacion) {
        return res.status(400).json({ msg: "No se encontro nada" });
      }
      res.json({ cotizacion });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  cotizacionGetIdCotizacion: async (req, res) => {
    const { id } = req.params
    try {
      const cotizacion = await Cotizacion.findById(id)
      if (!cotizacion) {
        return res.status(400).json({ msg: "No se encontro nada" });
      }
      res.json({ cotizacion });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el webMaster" });
    }
  },
  cotizacionRechazada: async (req, res) => {
    const { id } = req.params;
    try {
      const activar = await Cotizacion.findByIdAndUpdate(id, { estado: 0 });
      if (!activar) {
        res.status(400).json({ msg: "No se actualizo el estado" });
      }
      try {
        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Cotizacion rechazada exitosamente, realizada por ${usuario.nombre}`;
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
  cotizacionAceptada: async (req, res) => {
    const { id } = req.params;
    try {
      const desactivar = await Cotizacion.findByIdAndUpdate(id, { estado: 2 });
      if (!desactivar) {
        res.status(400).json({ msg: "No se actualizo el estado" });
      }
      try {
        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Cotización aceptada exitosamente, realizada por ${usuario.nombre}`;
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
  cotizacionObservada: async (req, res) => {
    const { id } = req.params;
    const { observacionRechazo } = req.body
    try {
      const rechazo = await Cotizacion.findByIdAndUpdate(id, { observacionRechazo });
      if (!rechazo) {
        res.status(400).json({ msg: "No se agregó la observación de rechazo" });
      }
      try {
        const usuario = req.usuario
        const idPerson = usuario._id;
        const observacion = `Cotización actualizada con la observación de rechazo, realizada por ${usuario.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }
      res.json({
        rechazo,
      });
    } catch (error) {
      res.stataus(500).json({ msg: "Hable con el WebMaster" });
    }
  },
};

export default cotizacion;
