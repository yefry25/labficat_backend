import tipoMuestra from "../models/tipo_muestra.js"

const tipomuestra = {

    tipoMuestraPost : async (req, res) => {
        const {tipos} = req.body
        try{

            const timuestra = new tipoMuestra({tipos})

            if(!timuestra){
                return res.status(400).json({msg:"No se registro los tipos de muestra"})
            }

            timuestra.save()

            res.json({timuestra})

        }catch(error){
            return res.status(500).json({msg:"Hable con el WebMaster"})
        }  
    },

    tipoMuestraGet : async (req,res) => {

        try {
            const timuestra = await tipoMuestra.find()

            if (!timuestra) {
                return res.status(400).json({ msg: "No hay tipos de muestras" })
            }

            res.json({ timuestra })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    }
}

export default tipomuestra 