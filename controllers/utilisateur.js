const Utilisateur = require('../models/utilisateur');
const Objet = require('../models/objet');
const mail = require ("../utils/sendMail");
const jwt = require('jsonwebtoken');



// this creates a JWT token for a given user id
const createToken =(_id) => {


    return jwt.sign({_id},process.env.SECRET , {expiresIn: '3d'})

}


//login function

async function login(req,res){

    const {email , password} = req.body
    try{
        //using the static method login defined in the model
        const utilisateur = await Utilisateur.login(email , password)

        //create token
        const token  = createToken(utilisateur._id)
        
        res.status(200).json({
            email , token

        });

    }
    catch(error){

        res.status(400).json({error : error.message})

    }

}



//register function
async function register(req , res){
    const { nom, age, mobile, adresse, image, email , password , role } = req.body
  
    try {
      // register the user using the static method signup
      const utilisateur = await Utilisateur.signup(nom, age, mobile, adresse, image, email , password , role)
  
      //create token to login with it
      const token  = createToken(utilisateur._id)
      
      //send email to the new user
      const from = "akram44244@gmail.com"
      const subject = "Holà Fabri"
      const text = "Merci pour votre inscription !"
      mail.sendEmail(from , email , subject , text)
  
      res.status(200).json({
        email,
        token
      });
    } catch(error) {
      res.status(400).json({error : error.message})
    }
  }


  

  ///////// LES FONCTIONS DE L'ADMIN /////////////////////


  async function approuverCompte(req, res) {
    const id = req.params.id;
    try {
     const utilisateur = await Utilisateur.findByIdAndUpdate(id,{isActive:true});
      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      if (utilisateur.isActive === true) {
        return res.status(200).json({ message: 'Compte déjà approuvé' });
      }
      res.status(200).json({ message: 'Compte approuvé avec succès' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  async function approuverObjet(req, res) {
    const id = req.params.id;
    try {
     const objet = await Objet.findByIdAndUpdate(id,{isValid:true});
      if (!objet) {
        return res.status(404).json({ message: 'Objet non trouvé' });
      }
      if (objet.isActive === true) {
        return res.status(200).json({ message: 'Poste déjà approuvé' });
      }
      res.status(200).json({ message: 'Poste approuvé avec succès' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } 


async function afficherUtilisateur(req, res) {
    let utilisateur = null;
    try {
        utilisateur = await Utilisateur.findById(req.params.id);
        if (utilisateur == null) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(utilisateur);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function afficherTousUtilisateurs(req, res) {
    let utilisateurs = null;
    try {
        utilisateurs = await Utilisateur.find();
        res.json(utilisateurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function supprimerUtilisateur(req, res) {
    try {
        const utilisateurSupprimé = await Utilisateur.findByIdAndRemove(req.params.id); 
        if (utilisateurSupprimé) {
            res.json({ message: 'Utilisateur supprimé avec succès' }); 
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' }); 
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
}

async function modifierUtilisateur(req, res) {
    try {
        const utilisateurModifié = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        sendEmail()
        if (utilisateurModifié) {
            res.json(utilisateurModifié);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
}

module.exports = {
    register,
    login,
    approuverCompte,
    approuverObjet,
    afficherUtilisateur,
    afficherTousUtilisateurs,
    supprimerUtilisateur,
    modifierUtilisateur
};
