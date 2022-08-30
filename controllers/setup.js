import Consecutivo from "../models/setup.js";

const consecutivo = {
    ConsecutivoGet: async (req, res) => { // listar todo 
        try {
            const consecutivos = await Consecutivo.find()
            if (!consecutivos) {
                res.status(400).json({ msg: "No se encontro lo buscado" })
            }
            res.json({
                consecutivos
            })
        } catch (error) {
            res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    idConsecutivoGet: async (req, res) => {// buscar por id
        const { id } = req.query
        try {
            const consecutivos = await Consecutivo.findById({ id })
            if (!consecutivos) {
                res.status(400).json({ msg: "No se encontro" })
            }
            res.json({
                consecutivos
            })
        } catch (error) {
            res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    ConsecutivoPost: async (req, res) => { // añadir
        const { consecutivoMuestra, consecutivoOferta, iva } = req.body
        try {
            const consecutivos = new Consecutivo({ consecutivoMuestra, consecutivoOferta, iva })
            if (!consecutivos) {
                res.status(400).json({ msg: "No se realizo la subida del consecutivo" })
            }
            consecutivos.save()
            res.json({
                consecutivos
            })
        } catch (error) {
            res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

}

export default consecutivo