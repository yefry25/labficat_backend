import Orden from "../models/orden_servicio.js";
import helperBitacora from "../helpers/bitacora.js";
import excel4node from "excel4node";
import path from "path";

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

    const lismamu = await Orden.find()
      .populate({ path: 'idMuestra', populate: { path: 'solicitante' } })
      .populate({ path: 'idMuestra', populate: { path: 'cotizacion' } })
      .populate({ path: 'idMuestra', populate: { path: 'tipoMuestra' } })
      .populate({ path: 'idMuestra', populate: { path: 'solicitante', populate: { path: 'ciudad' } } })
      .populate({ path: 'idMuestra', populate: { path: 'munRecoleccion' } });

    if (!lismamu) {
      res.status(400).json({ msg: "No se encontro lo buscado" });
    }

    res.json(lismamu)

    const libro = new excel4node.Workbook({
      dateFormat: 'yyyy/mm/dd'
    });
    const hoja = libro.addWorksheet('informe');

    const header = [
      "Fecha ingreso muestra",
      "Código muestra",
      "Solicitante",
      "NIT/CC",
      "Dirección",
      "Ciudad",
      "Departamento",
      "Contacto",
      "Teléfono",
      "Correo",
      "Municipio de recolección",
      "Dirección toma muestra",
      "Lugar toma muestra",
      "Muestra recolectada por",
      "Procedimiento muestreo",
      "Tipo muestra",
      "Matriz muestra",
      "Fecha recoleccion muestra",
      "Cotización",
      "Item cotización",
      "Fecha recepción muestra",
      "Fecha emisión muestra",
      "Fecha entrega resultados",
      "Seguimiento entrega resultados",
      "Estado muestra",
      "Diligenciado",
      "Supervisado",
      "Observaciones"
    ];
    const styleHeader = libro.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#689F38',
        fgColor: '#689F38',
      },
      font: {
        size: 11,
        color: '#FFFFFF',
        bold: true
      },
      alignment: {
        vertical: 'center',
        horizontal: 'center'
      },
      border: {
        left: {
          style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
          color: '#000000' // HTML style hex value
        },
        right: {
          style: 'thin',
          color: '#000000'
        },
        top: {
          style: 'thin',
          color: '#000000'
        },
        bottom: {
          style: 'thin',
          color: '#000000'
        },
      }
    })

    const styleBody = libro.createStyle({
      font: {
        color: '#000000',
        size: 11,
      },
      alignment: {
        vertical: 'center',
        horizontal: 'center'
      },
      border: {
        left: {
          style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
          color: '#000000' // HTML style hex value
        },
        right: {
          style: 'thin',
          color: '#000000'
        },
        top: {
          style: 'thin',
          color: '#000000'
        },
        bottom: {
          style: 'thin',
          color: '#000000'
        },
      }
    })

    for (let i = 0; i < header.length; i++) {
      const element = header[i];
      hoja.cell(1, i + 1).string(element).style(styleHeader);
      hoja.column(i + 1).setWidth(30);
      /* switch(i) {
        case 1:
          ws.column(2).setWidth(30);
          break;
        case 3:
          ws.column(4).setWidth(30);
          break;
        case 4:
          ws.column(5).setWidth(30);
          break;
        case 5:
          ws.column(6).setWidth(30);
          break;
      } */
    }

    for (let i = 0; i < lismamu.length; i++) {
      const element = lismamu[i];
      hoja.cell(i + 2, 1).date('2020/11/11').style(styleBody);
      hoja.cell(i + 2, 2).string(element.idMuestra.codMuestra).style(styleBody);
      hoja.cell(i + 2, 3).string(element.idMuestra.solicitante.nombre).style(styleBody);
      hoja.cell(i + 2, 4).string(element.idMuestra.solicitante.documento).style(styleBody);
      hoja.cell(i + 2, 5).string(element.idMuestra.solicitante.direccion).style(styleBody);
      hoja.cell(i + 2, 6).string(element.idMuestra.solicitante.ciudad.Ciudad).style(styleBody);
      hoja.cell(i + 2, 7).string(element.idMuestra.solicitante.ciudad.departamento).style(styleBody);
      hoja.cell(i + 2, 8).string(element.idMuestra.solicitante.contacto).style(styleBody);
      hoja.cell(i + 2, 9).string(element.idMuestra.solicitante.telefono).style(styleBody);
      hoja.cell(i + 2, 10).string(element.idMuestra.solicitante.correo).style(styleBody);
      hoja.cell(i + 2, 11).string(element.idMuestra.munRecoleccion.Ciudad).style(styleBody);
      hoja.cell(i + 2, 12).string(element.idMuestra.direccionTomaMuestra).style(styleBody);
      hoja.cell(i + 2, 13).string(element.idMuestra.lugarTomaMuestra).style(styleBody);
      hoja.cell(i + 2, 14).string(element.idMuestra.muestraRecolectadaPor).style(styleBody);
      hoja.cell(i + 2, 15).string(element.idMuestra.procedimientoMuestreo).style(styleBody);
      hoja.cell(i + 2, 16).string(element.idMuestra.tipoMuestra.tipos).style(styleBody);
      hoja.cell(i + 2, 17).string(element.idMuestra.matrizMuestra).style(styleBody);
      hoja.cell(i + 2, 18).date(element.idMuestra.fechaRecoleccion).style(styleBody);
      hoja.cell(i + 2, 19).string(element.idMuestra.cotizacion.numCotizacion).style(styleBody);
      hoja.cell(i + 2, 20).string(element.idMuestra.item).style(styleBody);
      hoja.cell(i + 2, 21).date(element.idMuestra.createdAt).style(styleBody);
      hoja.cell(i + 2, 22).date('2020/10/22').style(styleBody);
      hoja.cell(i + 2, 23).date(element.idMuestra.cotizacion.entregaResultados).style(styleBody);
      hoja.cell(i + 2, 24).string('hola').style(styleBody);
      hoja.cell(i + 2, 25).number(element.idMuestra.estado).style(styleBody);
      hoja.cell(i + 2, 26).string('yefry').style(styleBody);
      hoja.cell(i + 2, 27).string('yefry').style(styleBody);
    }
    const __dirname = path.resolve();
    const pathExcel = path.join(__dirname, 'excel', 'Informe7.xlsx')

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
