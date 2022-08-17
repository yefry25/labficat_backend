import Ciudad from "../models/ciudad.js"

const ciudad = {

    ciudadPost: async (req, res) => {
        const { departamento, codDepartamento, ciudad, codCiudad } = req.body
        try {
            const ciudades = new Ciudad({ departamento, codDepartamento, ciudad, codCiudad })
            if (!ciudades) {
                return res.status(400).json({ msg: "no se pudo registrar la ciudad" })
            }
            ciudad.save()
            res.json({
                ciudades
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    ciudadGet: async (req, res) => {
        try {
            const ciudades = await Ciudad.find();
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
        try {
            const ciudades = await Ciudad.find({
                $or: [
                    { ciudades: new RegExp(ciudad, 'i') }
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
    ciudadGetDepartamento: async (req, res) => {
        const { departamento } = req.body
        try {
            const ciudades = await Ciudad.find({
                $or: [
                    { ciudades: new RegExp(departamento, 'i') }
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
}

export default ciudad
