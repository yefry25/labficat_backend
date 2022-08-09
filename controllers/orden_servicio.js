import Orden from "../models/orden_servicio.js"

const Ordenes = {

  ordenPost: async (req, res) => {

    const { fechaIngrMuestra, idMuestra, parametroTecMetodo, estadoMuestra, realizadoPor, supervisadoPor, observaciones } = req.body

    try{

      const orden = new Orden({ fechaIngrMuestra, idMuestra, parametroTecMetodo, estadoMuestra, realizadoPor, supervisadoPor, observaciones })

      if(!orden){
        res.status(400).json({msg:"No se puedo registrar la orden"})
      }

      orden.save()
      res.json({ orden })

    }catch(error){
      res.status(500).json({msg:"Hable con el WebMaster"})
    }
  },

  listarFecha: async (req, res) => {
    const { fechaIngrMuestra } = req.params;
    let fechaI = `${fechaIngrMuestra}T00:00:00.000-05:00`
    let fechaF = `${fechaIngrMuestra}T23:59:59.000-05:00`

    try{

      const orden = await Orden.find({
        $and: [
          {
            fechaIngrMuestra: {
              $gte: new Date(fechaI)
            }
          },
          {
            fechaIngrMuestra: {
              $lte: new Date(fechaF)
            }
          }
        ]
      }
      );

      if(!orden){
        res.status(400).json({msg:"No se encontro"})
      }

      res.json({
        orden
      })

    }catch(error){
      res.status(500).json({msg:"Hable con el WebMaster"})
    }
  },

  ordenGet: async (req, res) => {
    try{

      const orden = await Orden.Find()

      if(!orden){
        res.json(400).json({msg:"No se encontro"})
      }

      res.json({ orden })

    }catch(error){
      res.status(500).json({msg:"Hable con el WebMaster"})
    }
  },

  ordenGetParametro: async (req, res) => {
    const { parametroTecMetodo } = req.body

    try{

      const parametro = await Orden.find({parametroTecMetodo})

      if(!parametro){
        res.status(400).json({msg:"No se encontro"})
      }

      res.json({ parametro })

    }catch(error){
      res.status(500).json({msg:"Hable con el WebMaster"})
    } 
  },

  ordenGetEstado: async (req, res) => {
    const { estadoMuestra } = req.body

    try{
      const estado = await Orden.find({estadoMuestra})

      if(!estado){
        res.status(400).json({msg:"No se encontro"})
      }

      res.json({ estado })

    }catch(error){
      res.status(500).json({msg:"Hable con el WebMaster"})
    }
  },

  ordenGetRealizado: async (req, res) => {
    const { realizadoPor } = req.body

    try{

      const realizado = await Orden.findById({realizadoPor})

      if(!realizado){
        res.status(400).json({msg:"No se encontro"})
      }

      res.json({ realizado })

    }catch(error){
      res.status(500).json({msg:"Hable con el WebMaster"})
    }
  },

  ordenGetSupervisado: async (req, res) => {
    const { supervisadoPor } = req.body

    try{
      const supervisado = await Orden.findById({supervisadoPor})

      if(!supervisado){
        res.status(400).json({msg:"No se encontro"})
      }

      res.json({ supervisado })

    }catch(error){
      res.status(500).json({msg:"Hable con el WebMaster"})
    }
  },

  ordenPut: async (req, res) => {
    const { id } = req.params
    const { _id, idMuestra, realizadoPor, supervisadoPor, ...resto } = req.body

    try{
      const modificar = await Orden.findByIdAndUpdate(id, resto);

      if(!modificar){
        res.status(400).json({msg:"No se encontro"})
      }

      res.json({
        modificar
      })

    }catch(error){
      res.status(500).json({msg:"Hable con el WebMaster"})
    }
  }
}

export default Ordenes
