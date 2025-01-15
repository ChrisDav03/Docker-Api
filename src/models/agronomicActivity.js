const mongoose = require('mongoose');
const agronomicActivitySchema = mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    activityType:{
        type: String,
        required: true
    },
    supplies:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('agronomicActivity', agronomicActivitySchema);