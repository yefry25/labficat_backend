import Ciudad from "../models/ciudad.js"

const ciudad = {
    ciudadGet: async (req, res) => {
        try {
            const ciudades = await Ciudad.find()

            if (!ciudades) {
                return res.status(400).json({
                    msg: "No hay ciudades"
                })
            }
            res.json({ ciudades })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
    ciudadGetCod: async (req, res) => {
        const { codCiudad } = req.body
        try {
            const ciudades = await Ciudad.find({ codCiudad })
            if (!ciudades) {
                return res.status(400).json({
                    msg: "codigo ciudad incorrecto"
                })
            }
            res.json({ ciudades })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
    ciudadGetDepartamento: async (req, res) => {
        const { codDepartamento } = req.body
        try {
            const ciudades = await Ciudad.find({ codDepartamento })
            if (!ciudades) {
                return res.status(400).json({
                    msg: "codigo departamento incorrecto"
                })
            }
            res.json({ ciudades })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
    ciudadGetNombre: async (req, res) => {
        const { ciudad } = req.body
        console.log(ciudad);
        try {
            const ciudades = await Ciudad.find({
                $or: [
                    /* { Ciudad: new RegExp(/^c.*s/, 'i') } */
                  // { Ciudad: new RegExp(/.*an.*/, 'i') }
                   /* { Ciudad: new RegExp(/^s.*a.*s/, 'i') } */
                   /* { Ciudad: new RegExp(/^v.*a$/, 'i') } */
                   { Ciudad: new RegExp(`^${ciudad}`, 'i') }
                ]
            })
            if (!ciudades) {
                return res.status(400).json({
                    ms: "ciudad no encontrada"
                })
            }
            console.log(ciudades);
            res.json({ ciudades })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
    ciudadGetNombreDepartamento: async (req, res) => {
        const { departamento } = req.body
        try {
            const ciudades = await Ciudad.find({
                $or: [
                    { departamento: new RegExp(`^${departamento}`, 'i') }
                ]
            })
            if (!ciudades) {
                return res.status(400).json({
                    ms: "ciudad no encontrada"
                })
            }
            res.json({ ciudades })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }

    },
    ciudadDepartamentos : async (req, res)=>{
        try{
            const departamentos= await Ciudad.find().distinct('departamento')
            if (!departamentos) {
                return res.status(400).json({
                    ms: "departamentos no encontrada"
                })
            }
            res.json({ departamentos })
        }catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    }
}

export default ciudad
