import Usuario from "../models/usuario.js"

const usuario = {
    usuarioGet: async (req, res) => {
        try {
            const usuario = await Usuario.find();

            if (!usuario) {
                return res.status(400).json({
                    msg: "No hay clientes"
                })
            }
            res.json({ usuario })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },

    usuarioGetNitoCC: async (req, res) => {

        const { nitOcc } = req.body

        try {

            const usuario = await Usuario.find({ nitOcc })

            if (!usuario) {
                return res.status(400).json({
                    msg: "Nit incorrecto"
                })
            }

            res.json({ usuario })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },

    usuarioGetNombre: async (req, res) => {
        const { nombre } = req.body

        try {

            const usuario = await Usuario.find({
                $or: [
                    { nombre: new RegExp(nombre, 'i') }
                ]
            })

            if (!usuario) {
                return res.status(400).json({
                    ms: "cliente no encontrado"
                })
            }

            res.json({ usuario })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },

    usuarioGetRoles: async (req, res) => {
        const { rol } = req.body

        try {

            const usuario = await Usuario.find({ rol })

            if (!usuario) {
                return res.status(400).json({ msg: "No se encontro" })
            }

            res.json({ usuario })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    usuarioPut: async (req, res) => {
        const { id } = req.params
        const { _id, createAt, ...resto } = req.body

        try {
            const modificar = await Usuario.findByIdAndUpdate(id, resto);

            if (!modificar) {
                return res.status(400).json({
                    msg: "no se encontro el id"
                })
            }

            res.json({ modificar })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    usuarioPost: async (req, res,) => {
        const { nombre, nitOcc, direccion, ciudad, departamento, contacto, telefono, correo, rol, estado } = req.body
        try {
            const usuario = new Usuario({ nombre, nitOcc, direccion, ciudad, departamento, contacto, telefono, correo, rol, estado })

            if (!usuario) {
                return res.status(400).json({ msg: "no se pudo registrar el cliente" })
            }

            usuario.save()
            res.json({
                usuario
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    personaActivar: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 })
        res.json({
            usuario
        })
    },

    personaDesactivar: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 })
        res.json({
            usuario
        })
    }

}

export default usuario



