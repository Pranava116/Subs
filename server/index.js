import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import { UserRouter } from './routes/auth.js';
import bcrypt from 'bcrypt';
import cors from 'cors'
import { CreateRouter } from './routes/create.js';
import { HomeRouter } from './routes/home.js';
const app = express();
const PORT = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
app.use(cors())
app.use(express.json())
app.use("/auth", UserRouter)
app.use("/create", CreateRouter)
app.use("/", HomeRouter)


app.listen(PORT, (req, res) => {
    mongoose.connect(mongo_uri).then("connected to db")
    console.log("Server running in port", PORT)
})