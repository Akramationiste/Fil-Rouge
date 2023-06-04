const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


//le model de l'utilisateur : 

const UtilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    age: {
        type:Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    }, 
    adresse: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "proprietaire", "client"],
        required: [true, "Spécifiez votre rôle svp"]
    },
    isActive: {
        type: Boolean,
        default: false
    },
    
},
   {timestamps: true}
   );




//Méthode de register statique

UtilisateurSchema.statics.signup = async function(nom, age, mobile, adresse, email , password , role) {

    //validtion

    if (!nom || !age || !mobile || !adresse || !email || !password || !role){

        throw Error('tous les champs sont requis !')
    }

    if (!validator.isEmail(email)){

        throw Error('email invalide')
    }

    if (!validator.isStrongPassword(password))
    {
        throw Error('le mot de passe est faible !')
    }

    const exists = await this.findOne({email})

    if (exists){

        throw Error('Email existe déjà')
    }

    const salt =await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    const Utilisateur = await this.create({nom, age, mobile, adresse, email , password : hash , role})

    return Utilisateur.toObject({ getters: true, versionKey: false, transform: function (doc, ret) {
        delete ret.password;
    } });


}



//Méthode de login statique

UtilisateurSchema.statics.login = async function(email , password){



    if (!email || !password ){

        throw Error('tous les champs sont requis !')
    }
    
    const Utilisateur = await this.findOne({email})

    if(!Utilisateur){
        throw Error('email incorrect')
    }

    const match = await bcrypt.compare(password , Utilisateur.password)

    if (!match){

        throw Error('mot de passe incorrect')
    }

    return Utilisateur


}





module.exports = mongoose.model('utilisateur', UtilisateurSchema);