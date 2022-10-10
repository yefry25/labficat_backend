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
      descuento,
    } = req.body;

    try {
      const dale = items.item1.itemsEnsayo.reduce((acc, it) => {
        return (acc += it.costoEnsayo);
      }, 0);
      items.item1.costo = dale;
      items.costoItem = items.item1.costo ;
      if(items.item2)  {
        const dale = items.item2.itemsEnsayo.reduce((acc, it) => {
          return (acc += it.costoEnsayo) ;
        }, 0);
        items.item2.costo = dale;
        items.costoItem +=  items.item2.costo 
      };
      if(items.item3) {
        const dale = items.item3.itemsEnsayo.reduce((acc, it) => {
          return (acc += it.costoEnsayo) ;
        }, 0);
        items.item3.costo = dale;
        items.costoItem +=  items.item3.costo
      };
      let sub=items.costoItem-descuento 
      const consecutivo = await Setup.findOne();
      console.log("iva"+consecutivo.iva);
      let to= Math.round(sub + sub * (consecutivo.iva/100))
      console.log('iva'+to);
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
      let consecutivooferta = consecutivo.consecutivoOferta + 1;
      const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
        consecutivoOferta: consecutivooferta,
      });
      if (!guardar) {
        return res.status(400).json({
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
        subTotal:items.costoItem,
        descuento,
        iva:consecutivo.iva,
        total:to,
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
      descuento,
    } = req.body;
    try {
      // con los reduce realizo las sumas de los costos de los items
      const dale = items.item1.itemsEnsayo.reduce((acc, it) => {
        return (acc += it.costoEnsayo);
      }, 0);
      items.item1.costo = dale;
      items.costoItem = items.item1.costo ;

      if(items.item2)  {
        const dale = items.item2.itemsEnsayo.reduce((acc, it) => {
          return (acc += it.costoEnsayo) ;
        }, 0);
        items.item2.costo = dale;
        items.costoItem +=  items.item2.costo 
      };

      if(items.item3) {
        const dale = items.item3.itemsEnsayo.reduce((acc, it) => {
          return (acc += it.costoEnsayo) ;
        }, 0);
        items.item3.costo = dale;
        items.costoItem +=  items.item3.costo
      };
      console.log("costo del item: "+items.costoItem);
      let sub=items.costoItem-descuento 
      console.log("subtotal: "+sub);
      const consecutivoSetup = await Setup.findOne();
      console.log("iva: "+consecutivoSetup.iva);
      let to= Math.round(sub + sub * (consecutivoSetup.iva/100))
      console.log('total: '+to);

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
      let concaNueva = `${primeraParte}V${versionNew}`;

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
        subTotal:items.costoItem,
        descuento,
        iva:consecutivoSetup.iva,
        total:to,
      });

      cotizacion.save();
      res.json({ cotizacion });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  cotizacionGet: async (req, res) => {
    try {
      const cotizacion = await Cotizacion.find()
      .populate({path:'idCliente',populate:{path:'ciudad',select:['departamento','Ciudad']}})
      .populate({path:'idElaboradoPor',populate:{path:'ciudad'}});

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
    console.log('fecha incial: '+fechaI);
    console.log('fecha final: '+fechaF);

    try {
      const cotizacion = await Cotizacion.find({
        $and: [{fechaEmision: {$gte: new Date(fechaI), $lt: new Date(fechaF)}}]
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
  cotizacionGetCliente: async (req, res)=>{
    const {idCliente}=req.body
    try{
      const cotizacion = await Cotizacion.find({idCliente});
      if (!cotizacion) {
        return res.status(400).json({ msg: "No se encontro nada" });
      }
      res.json({ cotizacion });
    }catch(error){
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  }
};

export default cotizacion;
