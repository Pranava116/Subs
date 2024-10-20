import express from 'express';
import cardModel from '../models/CardModel.js';

const router = express.Router();

router.put("/",  async(req, res) => {
    try {
        const {img, name, url, price, userID} = req.body;
        if(img == "" || name =="" || url=="" || price=="" || userID == ""){
            return res.json({message: "Fill up all the fields"})
        }
        const newCard = new cardModel({
        img: img,
        name: name,
        url: url,
        price: price,
        userOwner: userID
    })
    await newCard.save();
    return res.status(200).json({message: "Succesfully added"})
    } catch (error) {
        console.log(error)
    }
})

export {router as CreateRouter}