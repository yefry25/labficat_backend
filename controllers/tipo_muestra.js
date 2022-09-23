import tipoMuestra from "../models/tipo_muestra.js"

const tipomuestra = {

    tipoMuestraPost: async (req, res) => {
        const { tipos } = req.body
        try {
            const timuestra = new tipoMuestra({ tipos })
            if (!timuestra) {
                return res.status(400).json({ msg: "No se registro los tipos de muestra" })
            }
            timuestra.save()
            res.json({ timuestra })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    tipoMuestraGet: async (req, res) => {
        try {
            const timuestra = await tipoMuestra.find()
            if (!timuestra) {
                return res.status(400).json({ msg: "No hay tipos de muestras" })
            }
            res.json({ timuestra })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    tipoMuestraPut: async (req, res) => {
        const { id } = req.params
        const { _id, ...resto } = req.body;
        try {
            const modificar = await tipoMuestra.findByIdAndUpdate(id, resto);
            if (!modificar) {
                return res.status(500).json({ msg: "No se pudo actualizar la informacion de tipo muestra" })
            }
            res.json({
                modificar
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
}

export default tipomuestra 