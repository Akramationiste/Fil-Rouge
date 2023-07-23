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
    image: [{
        type: String,
        required: true
    }],      
    etat: {
        type: String,
        required: true,
        enum : ["moyen" , "bon état" , "neuf"]
    },
    wilaya: {
        type: String,
        required: true,
        enum : [
            "Adrar",
            "Chlef",
            "Laghouat",
            "Oum El Bouaghi",
            "Batna",
            "Béjaïa",
            "Biskra",
            "Béchar",
            "Blida",
            "Bouira",
            "Tamanrasset",
            "Tébessa",
            "Tlemcen",
            "Tiaret",
            "Tizi Ouzou",
            "Alger",
            "Djelfa",
            "Jijel",
            "Sétif",
            "Saïda",
            "Skikda",
            "Sidi Bel Abbès",
            "Annaba",
            "Guelma",
            "Constantine",
            "Médéa",
            "Mostaganem",
            "M'Sila",
            "Mascara",
            "Ouargla",
            "Oran",
            "El Bayadh",
            "Illizi",
            "Bordj Bou Arreridj",
            "Boumerdès",
            "El Tarf",
            "Tindouf",
            "Tissemsilt",
            "El Oued",
            "Khenchela",
            "Souk Ahras",
            "Tipaza",
            "Mila",
            "Aïn Defla",
            "Naâma",
            "Aïn Témouchent",
            "Ghardaïa",
            "Relizane",
            "El M'ghair",
            "El Menia",
            "Ouled Djellal",
            "Bordj Badji Mokhtar",
            "Beni Abbes",
            "Timimoun",
            "Touggourt",
            "Djanet",
            "In Salah",
            "In Guezzam"
          ]
          
    },
    prix:{
      type:Number,
      default:0
    },
    isValid: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true
    },
    objet_loue : {
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('objet', ObjetSchema);

