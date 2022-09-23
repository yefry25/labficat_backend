import Consecutivo from "../models/setup.js";

const helpersSetup = {
  existeSetupById: async (id) => {
    const existe = await Consecutivo.findById(id);
    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }
  },
};

export default helpersSetup;
