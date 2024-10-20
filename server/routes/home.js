import express from "express";
import cardModel from "../models/CardModel.js";

const router = express.Router();

router.put("/",  async(req, res) => {
    try {
        const response = await cardModel.find({userOwner: req.body.UserID})
        return res.json(response)
    } catch (error) {
        return res.json(error)
    }
})


router.delete(`/:id`, async(req, res) => {
    
    try {
        const { id } = req.params;
        const response = await cardModel.findByIdAndDelete(id)
        if(!response){
            return res.json({message: "Book not found"})
        }

         return res.send(response)

    } catch (error) {
        return console.log(error)
    }
    
})

export {router as HomeRouter}