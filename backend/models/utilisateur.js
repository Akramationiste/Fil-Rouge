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
        enum: ["admin", "user"],
        default: "user",
        // required: [true, "Spécifiez votre rôle svp"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    
},
   {timestamps: true}
   );




   UtilisateurSchema.statics.signup = async function(nom, age, mobile, adresse, email, password, role) {


    // Validation de l'inscription
    if (!nom || !age || !mobile || !adresse || !email || !password) {
        throw Error('Tous les champs sont requis !');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email invalide');
    }

    const strongPasswordOptions = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
    };

    if (!validator.isStrongPassword(password, strongPasswordOptions)) {
        throw Error('Le mot de passe doit contenir 8 caractères minimum, une lettre et un chiffre  !');
    }

    const exists = await this.findOne({email})

    if (exists){

        throw Error('Email existe déjà')
    }

    const salt =await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    const Utilisateur = await this.create({nom, age, mobile, adresse, email , password : hash});

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