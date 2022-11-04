import Color from "../models/color.js"

const colores = {
    colorGet: async (req, res) => {
        try {
            const color = await Color.find();

            if (!color) {
                return res.status(400).json({
                    msg: "No hay color",
                });
            }
            res.json({ color });
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster",
            });
        }
    },
    obtenerColor: async (req, res) => {
        const { color } = req.body;

        try {
            const colores = new Color({ color })

            if (!colores) {
                return res.status(404).json({ msg: "No se pudo agregar el color" })
            }
            colores.save()

            res.json({ colores })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    actualizarColor: async (req, res) => {
        const { id } = req.params
        const { _id, ...resto } = req.body;
        try {
            const modificar = await Color.findByIdAndUpdate(id, resto);
            if (!modificar) {
                return res.status(500).json({ msg: "No se pudo actualizar el color" })
            }
            res.json({
                modificar
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

}
export default colores