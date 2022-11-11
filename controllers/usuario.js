import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import validar from "../middlewares/validar.js";
import helperBitacora from "../helpers/bitacora.js";
import jwt from "jsonwebtoken"
import ip from "ip"
import transporter from "../database/mailer.js";

const usuario = {
  usuarioGet: async (req, res) => {
    try {
      const usuario = await Usuario.find().populate({
        path: "ciudad",
        select: ["Ciudad", "departamento"],
      });

      if (!usuario) {
        return res.status(400).json({
          msg: "No hay clientes",
        });
      }
      res.json({ usuario });
    } catch (error) {
      return res.status(500).json({
        msg: "Hable con el WebMaster",
      });
    }
  },
  usuarioGetDocumento: async (req, res) => {
    const { documento } = req.body;
    try {
      const usuario = await Usuario.find({ documento });
      if (!usuario) {
        return res.status(400).json({
          msg: "Nit incorrecto",
        });
      }
      res.json({ usuario });
    } catch (error) {
      return res.status(500).json({
        msg: "Hable con el WebMaster",
      });
    }
  },
  usuarioGetNombre: async (req, res) => {
    const { nombre } = req.body;
    try {
      const usuario = await Usuario.find({
        $or: [{ nombre: new RegExp(nombre, "i") }],
      });
      if (!usuario) {
        return res.status(400).json({
          ms: "cliente no encontrado",
        });
      }
      res.json({ usuario });
    } catch (error) {
      return res.status(500).json({
        msg: "Hable con el WebMaster",
      });
    }
  },
  usuarioGetEmail: async (req, res) => {
    const { email } = req.body
    try {
      const user = await Usuario.findOne({ correo: email })

      if (!user) {
        return res.status(400).json({ msg: "No se encontro" });
      }

      res.json({ user })
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  usuarioGetRoles: async (req, res) => {
    const { rol } = req.body;
    try {
      const usuario = await Usuario.find({ rol });
      if (!usuario) {
        return res.status(400).json({ msg: "No se encontro" });
      }
      res.json({ usuario });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  usuarioPost: async (req, res) => {
    const {
      tipoPersona,
      nombre,
      documento,
      direccion,
      ciudad,
      contacto,
      celularContacto,
      telefono,
      correo,
      rol,
    } = req.body;

    let pass = documento;

    const usuario = new Usuario({
      tipoPersona,
      nombre,
      documento,
      direccion,
      ciudad,
      contacto,
      celularContacto,
      telefono,
      correo,
      password: pass,
      rol,
    });

    try {
      const salt = bcryptjs.genSaltSync(10);
      usuario.password = bcryptjs.hashSync(pass, salt);
    } catch (error) {
      return res.status(500).json({ msg: "No se pudo encriptar la contraseña" })
    }

    if (!usuario) {
      return res.status(400).json({ msg: "no se pudo registrar el cliente" });
    }
    usuario.save();

    try {
      let user = req.usuario
      const idPerson = user._id;
      const observacion = `Registro exitoso del usuario ${usuario.nombre} realizado por ${user.nombre}`;
      helperBitacora.llenarBitacora(idPerson, observacion);
    } catch (error) {
      return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
    }
    res.json({
      usuario,
    });


  },
  usuarioLogin: async (req, res) => {
    const { correo, password } = req.body;
    try {
      const usuario = await Usuario.findOne({ correo });
      if (!usuario) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos",
        });
      }
      if (usuario.estado == 0) {
        return res.status(400).json({
          msg: "Usuario inactivo",
        });
      }

      const validPassword = bcryptjs.compareSync(password, usuario.password);
      if (!validPassword) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos",
        });
      }

      const token = await validar.generarJWT(usuario.id);
      const navegador = req.headers['user-agent']
      /* const ip = req.socket.remoteAddress */
      const ipAdd = ip.address();

      try {
        const idPerson = usuario._id;
        const observacion = `Inicio de sesión realizado por ${usuario.nombre} en el navegador ${navegador} con la ip ${ipAdd}`;
        helperBitacora.llenarBitacora(idPerson, observacion);
      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }
      res.json({
        usuario,
        token,
        navegador,
        ip
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Hable con el WebMaster",
      });
    }
  },
  personaActivar: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 });

    try {
      const user = req.usuario
      const idPerson = user._id;
      const observacion = `El usuario ${usuario.nombre} fue activado exitosamente por ${user.nombre}`;
      helperBitacora.llenarBitacora(idPerson, observacion);

    } catch (error) {
      return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
    }
    res.json({
      usuario,
    });
  },
  personaDesactivar: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 });

    try {
      const user = req.usuario
      const idPerson = user._id;
      const observacion = `El usuario ${usuario.nombre} fue inactivado exitosamente por ${user.nombre}`;
      helperBitacora.llenarBitacora(idPerson, observacion);

    } catch (error) {
      return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
    }

    res.json({
      usuario,
    });
  },
  personaVacaciones: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: 2 });

    try {
      const user = req.usuario
      const idPerson = user._id;
      console.log("hola: " + idPerson);
      const observacion = `El usuario ${usuario.nombre} fue actualizado su estado a vacaciones exitosamente por ${user.nombre}`;
      helperBitacora.llenarBitacora(idPerson, observacion);

    } catch (error) {
      return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
    }

    res.json({
      usuario,
    });
  },
  usuarioPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, estado, ...resto } = req.body;

    try {
      console.log("hola: " + resto.password);
      const modificar = await Usuario.findByIdAndUpdate(id, resto);
      if (!modificar) {
        return res
          .status(500)
          .json({ msg: "No se pudo actualizar la informacion del usuario" });
      }
      try {
        const user = req.usuario
        const idPerson = user._id;
        console.log("hola: " + idPerson);
        const observacion = `Actualización exitosa del usuario ${modificar.nombre} realizado por ${user.nombre}`;
        helperBitacora.llenarBitacora(idPerson, observacion);
      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear el registro de bitacora" })
      }

      res.json({
        modificar,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
  recuperarPassword: async (req, res) => {
    const { correo } = req.body
    const message = 'Revisa tu correo electrónico '
    let verificationLink

    try {
      const user = await Usuario.findOne({ correo })
      /* console.log('user: ' + user); */

      const token = jwt.sign({ idUsuario: user._id, nombre: user.nombre }, process.env.CLAVERESETTOKEN, { expiresIn: '10m' })
      verificationLink = `
      http://localhost:8080/#/cambiarPrueba`
      user.resetToken = token
      console.log("token: " + user.resetToken);

      try {
        const modificar = await Usuario.findByIdAndUpdate(user._id, { resetToken: token });
        if (!modificar) {
          return res
            .status(500)
            .json({ msg: "No se pudo insertar el token" });
        }

      } catch (error) {
        return res.status(500).json({ msg: "Error al ingresar la token" });
      }

    } catch (error) {
      return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }

    try {
      await transporter.sendMail({
        from: '"Recuperación de la contraseña" <jefabecerra@misena.edu.co>', // sender address
        to: correo, // list of receivers
        subject: "Presione el link para poder cambiar tu contraseña, El link solo tiene validez por 10 minutos", // Subject line
        html: `Link: ${verificationLink}`, // html body
      });
    } catch (error) {
      return res.status(404).json({ msg: 'No se pudo enviar el correo de verificación' })

    }

    res.json({ msg: message })
  },
  crearNuevaPassword: async (req, res) => {
    const { nuevaPassword } = req.body;
    const resetToken = req.header('reset')

    try {
      const verificar = jwt.verify(resetToken, process.env.CLAVERESETTOKEN)
      console.log(verificar.idUsuario);
      const user = await Usuario.findOne({ _id: verificar.idUsuario })
      console.log(user);

      if (!user) {
        return res.status(401).json({
          msg: "Token no válido "
        })
      }
      user.password = nuevaPassword
      const salt = bcryptjs.genSaltSync(10);
      user.password = bcryptjs.hashSync(nuevaPassword, salt);

      try {
        const modificar = await Usuario.findByIdAndUpdate(user._id, { password: user.password });
        if (!modificar) {
          return res
            .status(500)
            .json({ msg: "No se pudo actualizar la contraseña del usuario" });
        }

      } catch (error) {
        return res.status(500).json({ msg: "Error al actualizar la contraseña" });
      }

      res.json({ msg: 'Contraseña cambiada exitosamente' })

    } catch (error) {
      return res.status(500).json({ msg: 'Hable con el WebMaster' })
    }
  }
};
export default usuario;
