import mongoose from "mongoose";
import Ensayo from "../models/ensayo.js";

const helpersEnsayo = {
  existeAnalisisMuestra: async (analisisMuestra) => {
    for (let i = 0; i < analisisMuestra.length; i++) {
      const element = analisisMuestra[i];
      const validarId = mongoose.Types.ObjectId(element.ensayo);

      if (!validarId) {
        throw new Error("el ID no existe");
      }

      const x = element.ensayo;
      const existe = await Ensayo.findById(x);

      if (!existe) {
        throw new Error("el analisis de la muestra no existe");
      }
    }
  },

  existeEnsayoById: async (id) => {
    const existe = await Ensayo.findById(id);

    if (!existe) {
      throw new Error(`El id ensayo no existe ${id}`);
    }
  },
  existeEnsayoByNombre : async (ensayo) => {
    const existe = await Ensayo.find()
    
    existe.forEach((datos)=>{
      if(datos.ensayo==ensayo){
        throw new Error(`El nombre del ensayo ya existe: '${ensayo}'`);
      }
    })
  },
  itemEnsayo: async (items) => {
    items.item1.itemsEnsayo.forEach( async (valor) => {
      const element = valor.ensayo
      const validarId = mongoose.Types.ObjectId(element);

      if (!validarId) {
        throw new Error("el ID no existe");
      }
      const x = element;
      const existe = await Ensayo.findById(x); 
      if (!existe) {
        throw new Error("el item1 no existe"); 
      }
    });
    if (items.item2.itemsEnsayo.length > 0) {
      items.item2.itemsEnsayo.forEach(async (valor)=>{
        const element = valor.ensayo
      const validarId = mongoose.Types.ObjectId(element); 

      if (!validarId) {
        throw new Error("el ID no existe");
      }
      const x = element;
      const existe = await Ensayo.findById(x);
      if (!existe) {
        throw new Error("el item2 no existe");
      }
      })
    }
    if (items.item3.itemsEnsayo.length > 0) {
      items.item3.itemsEnsayo.forEach(async (valor)=>{
        const element = valor.ensayo
      const validarId = mongoose.Types.ObjectId(element);

      if (!validarId) {
        throw new Error("el ID no existe");
      }
      const x = element;
      const existe = await Ensayo.findById(x);
      if (!existe) {
        throw new Error("el item3 no existe");
      }
      })
    }
  },
};

export default helpersEnsayo ;
