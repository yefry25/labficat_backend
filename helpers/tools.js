import Muestra from '../models/muestra.js'
import Cotizacion from '../models/cotizacion.js'
import Setup from '../models/setup.js'

const tools = {
    consecutivoMuestra: async (req, res) => {
        const consecutivo = await Setup.findOne();
        let conse = "";
        if (consecutivo.consecutivoMuestra.toString().length == 1) {
            conse = `000${consecutivo.consecutivoMuestra}`;
        } else if (consecutivo.consecutivoMuestra.toString().length == 2) {
            conse = `00${consecutivo.consecutivoMuestra}`;
        } else if (consecutivo.consecutivoMuestra.toString().length == 3) {
            conse = `0${consecutivo.consecutivoMuestra}`;
        } else {
            conse = consecutivo.consecutivoMuestra;
        }
        return conse
    },
    consecutivoCotizacion: async (req, res) => {
        const consecutivo = await Setup.findOne();
        let conse = "";
        if (consecutivo.consecutivoOferta.toString().length == 1) {
            conse = `000${consecutivo.consecutivoOferta}`;
        } else if (consecutivo.consecutivoOferta.toString().length == 2) {
            conse = `00${consecutivo.consecutivoOferta}`;
        } else if (consecutivo.consecutivoOferta.toString().length == 3) {
            conse = `0${consecutivo.consecutivoOferta}`;
        } else {
            conse = consecutivo.consecutivoOferta;
        }
        return conse
    },
    cuentasCotizacion: async (items) => {

        
        const dale = items.item1.itemsEnsayo.reduce((acc, it) => {
            return (acc += it.costoEnsayo);
        }, 0);
        items.item1.costo = dale;
        items.costoItem = items.item1.costo;
        if (items.item2) {
            const dale = items.item2.itemsEnsayo.reduce((acc, it) => {
                return (acc += it.costoEnsayo);
            }, 0);
            items.item2.costo = dale;
            items.costoItem += items.item2.costo
        };
        if (items.item3) { 
            const dale = items.item3.itemsEnsayo.reduce((acc, it) => {
                return (acc += it.costoEnsayo);
            }, 0);
            items.item3.costo = dale;
            items.costoItem += items.item3.costo
        };
        let sub = items.costoItem - 1
        const consecutivo = await Setup.findOne();
        /* console.log("iva"+consecutivo.iva); */
        let to = Math.round(sub + sub * (consecutivo.iva / 100))
        console.log("to: "+to);
    }
}

export default tools