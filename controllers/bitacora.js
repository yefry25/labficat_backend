import Bitacora from '../models/bitacora.js';

const bitacora = {
    bitacoraGet: async (req, res) => {
        try { 
            const bitacoras = await Bitacora.find()
            .populate({ path:'usuario'});
            if (!bitacoras) {
                return res.status(400).json({
                    msg: "No hay informacion"
                })
            }
            res.json({ bitacoras })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
}

export default bitacora