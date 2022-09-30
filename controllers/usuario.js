import Usuario from "../models/usuario.js"
import bcryptjs from "bcryptjs"
import validar from "../middlewares/validar.js"

const usuario = {
    usuarioGet: async (req, res) => {
        try {
            const usuario = await Usuario.find().populate({path:'ciudad', select:['Ciudad','departamento']})

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
    usuarioGetDocumento: async (req, res) => {
        const { documento } = req.body
        try {
            const usuario = await Usuario.find({ documento })
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
    usuarioPost: async (req, res,) => {
        const { tipoPersona, nombre, documento, direccion, ciudad, contacto, celularContacto ,telefono, correo, password, rol } = req.body

        try {
            const usuario = new Usuario({ tipoPersona, nombre, documento, direccion, ciudad, contacto, celularContacto ,telefono, correo, password, rol })
            const salt = bcryptjs.genSaltSync(10)
            usuario.password = bcryptjs.hashSync(password, salt)
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
    usuarioLogin: async (req, res) => {
        const { correo, password } = req.body;
        try {
            const usuario = await Usuario.findOne({ correo })
            if (!usuario) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }
            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                    
                })
            }
            const token = await validar.generarJWT(usuario.id);
            res.json({
                usuario,
                token
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
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
    },
    personaVacaciones: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 2 })
        res.json({
            usuario
        })
    },
    usuarioPut: async (req, res) => {
        const { id } = req.params
        const { _id, createdAt, estado, ...resto } = req.body;
        try {
            const modificar = await Usuario.findByIdAndUpdate(id, resto);
            if (!modificar) {
                return res.status(500).json({ msg: "No se pudo actualizar la informacion del usuario" })
            }
            res.json({
                modificar
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
}

export default usuario



