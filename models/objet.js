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
    description: {
        type: String,
        required: true
    },
    objet_loue : Boolean
});


module.exports = mongoose.model('objet', ObjetSchema);

