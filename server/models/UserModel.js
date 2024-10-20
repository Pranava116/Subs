import mongoose, { Schema } from "mongoose";

const UserModel = new Schema({
    username: String,
    password: String
})
const User = mongoose.model("User", UserModel)
export default User;