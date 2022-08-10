import Resultado from "../models/informe_resultado.js"

const resultado = {

    resultadoPost: async (req, res) => {
        const{idMuestra,informeResulNumero, fechaEmisionInforme, analisisMuestra,observaciones}= req.body
        try {
            const resultado = new Resultado({idMuestra,informeResulNumero, fechaEmisionInforme, analisisMuestra,observaciones})

            if (!resultado) {
                return res.status(400).json({ msg: "no se pudo registrar el resultado" })
            }
            resultado.save()
            res.json({
                resultado
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    resultadoGetFechaEmi: async (req, res) => {
        const { fechaEmisionInforme } = req.body;
        let fechaI = `${fechaEmisionInforme}T00:00:00.000-05:00`
        let fechaF = `${fechaEmisionInforme}T23:59:59.000-05:00`

        try {
            const resultado = await Resultado.find({
                $and: [
                    {
                        fechaEmisionInforme: {
                            $gte: new Date(fechaI)
                        }
                    },
                    {
                        fechaEmisionInforme: {
                            $lte: new Date(fechaF)
                        }
                    }
                ]
            }
            );

            if (!resultado) {
                return res.status(400).json({ msg: "No se encontro" })
            }

            res.json({
                resultado
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    resultadoPut: async (req, res) => {
        const { id } = req.params
        const { _id,...resto } = req.body

        try {
            const modificar = await Resultado.findByIdAndUpdate(id, resto);

            if(!modificar){
                return res.status(400).json({msg:"No se pudo modificar el informe de resultados"})
            }
            res.json({
                modificar
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    }
}

export default resultado


