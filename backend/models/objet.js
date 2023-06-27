const mongoose = require('mongoose');



const ObjetSchema = new mongoose.Schema({
    
    nom_objet: {
        type: String,
        required: true
    },
    proprietaire_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "utilisateur",
        required : true
    },
    cat_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "categorie",
        required : true
    },
    image: {
        type: String,
        required: true
    },      
    etat: {
        type: String,
        required: true
    },
    note: {
        type: Number,
        required: true
    },
    prix:{
      type:Number,
      default:0
    },
    isValid: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    objet_loue : {
        type: Boolean
    },
    objet_reserve : {
        type : Boolean
    }
});


module.exports = mongoose.model('objet', ObjetSchema);

