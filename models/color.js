import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
    color:{
        type:String,
        default:'#17202A'
    }
})

export default mongoose.model('Color',colorSchema)