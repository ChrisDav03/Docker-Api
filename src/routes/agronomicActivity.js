const express = require("express");
const agronomicActivitySchema = require('../models/agronomicActivity');
const router = express.Router();

router.post('/agronomicActivity', (req,res)=>{
    const agronomicActivity = agronomicActivitySchema(req.body);
    agronomicActivity
    .save()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}))
});

router.get('/agronomicActivity', (req,res)=>{
    agronomicActivitySchema
    .find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}))
});

router.get('/agronomicActivity/:id', (req,res)=>{
    const {id} = req.params;
    agronomicActivitySchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}))
});
router.put('/agronomicActivity/:id', (req,res)=>{
    const {id} = req.params;
    const {date, activityType, supplies, duration} = req.body;
    agronomicActivitySchema
    .updateOne({_id: id},{ $set: {date, activityType, supplies, duration}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}))
});
router.delete('/agronomicActivity/:id', (req,res)=>{
    const {id} = req.params;
    agronomicActivitySchema
    .findByIdAndDelete({_id: id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}))
});


module.exports = router;