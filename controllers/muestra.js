import Muestra from '../models/muestra.js';

const muestra = {
    muestraPost: async (req, res) => {
        const { idCliente, codMuestra, muniRecoleccion, direccionTomaMuestra, lugarTomaMuestra, muestraRecolectadaPor, procedimientoMuestreo, tipoMuestra, matrizMuestra, fechaRecoleccion } = req.body;

        try {
            const muestra = new Muestra({ idCliente, codMuestra, muniRecoleccion, direccionTomaMuestra, lugarTomaMuestra, muestraRecolectadaPor, procedimientoMuestreo, tipoMuestra, matrizMuestra, fechaRecoleccion })
            if (!muestra) {
                return res.status(400).json({ msg: "no se pudo registrar la muestra" })
            }
            muestra.save()
            res.json({ muestra })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    muestraGet: async (req, res) => {
        try {
            const muestra = await Muestra.find()

            if (!muestra) {
                return res.status(400).json({ msg: "No hay muestras" })
            }

            res.json({ muestra })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    muestraGetMunicipio: async (req, res) => {
        const { municipio } = req.body

        try {
            const muestra = await Muestra.find({
                $or: [
                    { muniRecoleccion: new RegExp(municipio, "i") }
                ]
            });

            if (!muestra) {
                return res.json({ msg: "No se encontro lo buscado" })
            }
            res.json({ muestra })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    muestraGetLugar: async (req, res) => {
        const { lugar } = req.body

        try {
            const muestra = await Muestra.find({
                $or: [
                    { lugarTomaMuestra: new RegExp(lugar, "i") }
                ]
            });

            if (!muestra) {
                return res.status(400).json({ msg: "No se encontro lo buscado" })
            }
            res.json({ muestra })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    muestraGetTipo: async (req, res) => {
        const { tipoMuestra } = req.body

        try {
            const muestra = await Muestra.find({
                $or: [
                    { tipoMuestra: new RegExp(tipoMuestra, "i") }
                ]
            });

            if (!muestra) {
                return res.status(400).json({ msg: "No se encontro lo buscado" })
            }

            res.json({ muestra })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    muestraGetLisMaMu: async (req, res) => {

    },

    muestraPut: async (req, res) => {
        const { id } = req.params
        const { _id, idCliente, muestraRecolectadaPor, ...resto } = req.body

        try {

            const modificar = await Muestra.findByIdAndUpdate(id, resto);

            if (!modificar) {
                return res.status(400).json({ msg: "No se pudo modificar la muestra" })
            }

            res.json({
                modificar
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    personaActivar: async (req, res) => {
        const { id } = req.params;
        const muestra = await Muestra.findByIdAndUpdate(id, { estado: 1 })
        res.json({
            muestra
        })
    },

    personaDesactivar: async (req, res) => {
        const { id } = req.params;
        const muestra = await Muestra.findByIdAndUpdate(id, { estado: 0 })
        res.json({
            muestra
        })
    }
}

export default muestra