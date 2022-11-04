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

    ConsecutivoPut: async (req, res) => {
        const { id } = req.params
        const { _id, createAt, ...resto } = req.body;
        try {
            const modificar = await Consecutivo.findByIdAndUpdate(id, resto);
            if (!modificar) {
                return res.status(500).json({ msg: "No se pudo actualizar la informacion de los consecutivos" })
            }
            res.json({
                modificar
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    obtenerColor: async (req, res)=>{
        const {color}=req.body

        try {
            const colores = new Consecutivo({color})

            if(!colores){
                res.status(400).json({ msg: "No se realizo la subida del color" })
            }
            colores.save();

            res.json({color});
        } catch (error) {
            return res.status(500).json({msg:"Hable con el WebMaster"})
        }
    }
}
export default consecutivo