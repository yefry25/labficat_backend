import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
    color:{
        type:String,
        default:'#E65100'
    }
})

export default mongoose.model('Color',colorSchema)