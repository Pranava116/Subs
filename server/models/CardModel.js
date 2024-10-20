import mongoose, { Schema } from "mongoose";

const CardModel = new Schema({
    img: String,
    name: String,
    url: String,
    price: Number,
     userOwner:{type: mongoose.Types.ObjectId, ref: "users"}
    
    
})
const cardModel = mongoose.model("cardModel", CardModel)
export default cardModel;