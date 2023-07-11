const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "utilisateur",
        required : true
    },
    objet_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "objet",
        required : true
    },
    date_location: {
        type : Date,
        required : true
    },
    date_retour: {
        type : Date,

    },
    jours: {
        type : Number,
        required : true
    }
});


module.exports = mongoose.model('location', LocationSchema);