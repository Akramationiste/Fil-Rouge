const mongoose = require('mongoose');

const  CategorieSchema = new mongoose.Schema({
    nom_cat: {
        type: String,
        required: true
    },
    nbr_objets: {
      type: Number,
      required: true,
    },
    
});


module.exports = mongoose.model('categorie', CategorieSchema);