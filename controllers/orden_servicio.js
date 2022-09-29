import Orden from "../models/orden_servicio.js";

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
        });

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

    try{
   
      const modificar = await Orden.findByIdAndUpdate(id, resto) ;
      if (!modificar) {
        return res
          .status(400)
          .json({
            msg: "No se pudo agregar resultado e incertidumbre a la orden",
          });
      }
      const verificar = await Orden.findById(id);
      console.log("resultado: "+verificar.itemsorden[0].resultado);
      console.log("incertidumbre: "+verificar.itemsorden[0].incertidumbre);
      if (
        verificar.itemsorden[0].resultado != 0 &&
        verificar.itemsorden[0].incertidumbre != 0
      ) {
        console.log("id: "+id);
        const updateDocument={
          $push: {"itemsorden.$[item].estado":"Analiado"}
        }
        const options = {
          arrayFilters:[
            "item.idensayo"
          ]
        }
        const actualizar = await Orden.findByIdAndUpdate(id,updateDocument);
        if (!actualizar) {
          return res
            .status(400)
            .json({ msg: "No se pudo actualizar el estado de la orden de servicio"});
        }
        res.json({
          actualizar
        });
      }
      /* for (let i = 0; i < verificar.itemsorden.length; i++) {
        const element = verificar[i];
        console.log(element);
        console.log("si: "+element.resultado);
        console.log("no: "+element.incertidumbre);

        if(element.resultado!=null && element.incertidumbre!=null){
          console.log('sirve');
        }
      } */
    }catch(error){
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
  informeDeResultados: async (req, res)=>{
    try{

      const informe = await Orden.find()
      .populate({path:'idMuestra',
      populate :{path:'solicitante',
      populate: {path:'ciudad'}},
      })
      .populate({path:'idMuestra',
      populate: {path:'munRecoleccion'}
      })
      .populate({path:'idMuestra',
        populate: {path:'tipoMuestra'}
      })
      .populate({
        path:'itemsorden.idensayo'
      })

      if(!informe) {
        res.status(400).json({ msg: "No se encontro lo buscado" });
      }

      res.json({informe})

    }catch(error){
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  }
};

export default Ordenes;
