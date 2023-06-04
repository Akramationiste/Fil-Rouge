const mongoose = require('mongoose');

const CommentaireSchema = new mongoose.Schema({
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
    comment: {
        type: String,
        required : true
    },
    Date: {
        type: Date, 
        default: new Date()
    }
});


module.exports = mongoose.model('commentaire', CommentaireSchema);