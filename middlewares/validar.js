import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js";

const validar = {
    generarJWT : (uid) => {
        return new Promise((resolve, reject) => {
            const payload = { uid };
            jwt.sign(payload, process.env.CLAVESECRET, {
                expiresIn: "4h"//4h
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token")
                } else {
                    resolve(token)
                }
            })
        })
    
    },
    
    validarJWT : async (req, res, next) => {
        const token = req.header("x-token");
        if (!token) {
            return res.status(401).json({
                msg: "No hay token en la peticion"
            })
        }
        try {
            const { uid } = jwt.verify(token, process.env.CLAVESECRET)
            let usuario = await Usuario.findById(uid);
            if (!usuario) {
                return res.status(401).json({
                    msg: "Token no válido "//- usuario no existe DB
                })
            }
            if (usuario.estado == 0) {
                return res.status(401).json({
                    msg: "El usuario esta inactivo " //- usuario con estado: false
                })
            }
            req.usuario=usuario
            next();
        } catch (error) {
            res.status(501).json({
                msg: 'Token expiró, por favor inicie sesión nuevamente'
            })
        }
    },
    validarResetJWT : async (req, res, next) =>{
        const token = req.header("reset");
        if (!token) {
            return res.status(401).json({
                msg: "No hay token en la peticion"
            })
        }
        try {
            const tokenValidar = jwt.verify(token, process.env.CLAVERESETTOKEN)
             
            if(!tokenValidar){
                return res.status(401).json({
                    msg: "No hay token en la peticion"
                })
            }

            next();
            
        } catch (error) {
            return res.status(500).json({msg:'Something goes wrong!'})
        }
    }
}

export default validar