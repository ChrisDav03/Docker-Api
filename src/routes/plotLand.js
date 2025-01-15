const express = require("express");
const plotLandSchema = require('../models/plotLand');
const router = express.Router();

router.post('/plotLand', (req,res)=>{
    const plotLand = plotLandSchema(req.body);
    plotLand
    .save()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}))
});

router.get('/plotLand', (req,res)=>{
    plotLandSchema
    .find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}))
});

router.get('/plotLand/:id', (req,res)=>{
    const {id} = req.params;
    plotLandSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}))
});
router.put('/plotLand/:id', (req,res)=>{
    const {id} = req.params;
    const {name, location, plantCultivation} = req.body;
    plotLandSchema
    .updateOne({_id: id},{ $set: {name, location, plantCultivation}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}))
});
router.delete('/plotLand/:id', (req,res)=>{
    const {id} = req.params;
    plotLandSchema
    .findByIdAndDelete({_id: id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}))
});


module.exports = router;