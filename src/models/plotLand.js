const mongoose = require('mongoose');
const plotLandSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        lat: {
            type: Number,
            required: true
        },
        lang: {
            type: Number,
            require: true
        }
    },
    plantCultivation:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('plotLand', plotLandSchema);