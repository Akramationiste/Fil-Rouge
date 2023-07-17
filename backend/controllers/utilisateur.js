const Utilisateur = require('../models/utilisateur');
const Objet = require('../models/objet');
const mail = require("../utils/sendMail");
const jwt = require('jsonwebtoken');
require('dotenv').config()








// Cette fonction crée un jeton JWT pour un ID utilisateur donné
const createToken = (_id) => {
  console.log({_id,env: process.env.SECRET});
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};






// Fonction de connexion
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const utilisateur = await Utilisateur.login(email, password);
    const token = createToken(utilisateur._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};







// Fonction d'inscription
const register = async (req, res) => {
  const { nom, age, mobile, adresse, email, password } = req.body;
  try {
    const utilisateur = await Utilisateur.signup(nom, age, mobile, adresse, email, password);
    const token = createToken(utilisateur._id);
    const from = "muchamucha92@gmail.com";
    const subject = "FabriKri : Bienvenue !";
    const text = "Merci pour votre inscription !";
    mail.sendEmail(from, email, subject, text);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};








// Fonction d'approbation du compte utilisateur
const approuverCompte = async (req, res) => {
  const id = req.params.id;
  try {
    const utilisateur = await Utilisateur.findByIdAndUpdate(id, { isActive: true });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    // if (utilisateur.isActive === true) {
    //   return res.status(200).json({ message: 'Compte déjà approuvé' });
    // }
    res.status(200).json({ message: 'Compte approuvé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};







// Fonction d'approbation de l'objet
const approuverObjet = async (req, res) => {
  const id = req.params.id;
  try {
    const objet = await Objet.findByIdAndUpdate(id, { isValid: true });
    if (!objet) {
      return res.status(404).json({ message: 'Objet non trouvé' });
    }
    // if (objet.isActive === true) {
    //   return res.status(200).json({ message: 'Poste déjà approuvé' });
    // }
    res.status(200).json({ message: 'Poste approuvé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






/////// Fonction pour afficher un utilisateur pour le profil //////////////

const afficherUtilisateur = async (req, res) => {
  try {
    const userId = req.params.id;

    const utilisateur = await Utilisateur.findById(userId);

    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/////// Fonction pour afficher un utilisateur pour l'objet //////////////

const afficherUtilisateurId = async (req, res) => {
  try {

    // Récupérer l'utilisateur en fonction de l'ID
    const objetId = req.params.id

    const objet = await Objet.findById(objetId);

    if (!objet) {
      return res.status(404).json({ message: 'Objet non trouvé' });
    }

    const utilisateur = await Utilisateur.findById(objet.proprietaire_id);
    
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(utilisateur);
  } catch (err) {
    console.log({UTILISATEUR: err})

    res.status(500).json({ message: err.message });
  }
};







// Fonction pour afficher tous les utilisateurs
const afficherTousUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






// Fonction pour supprimer un utilisateur
const supprimerUtilisateur = async (req, res) => {
  try {
    const utilisateurSupprime = await Utilisateur.findByIdAndRemove(req.params.id);
    if (utilisateurSupprime) {
      res.json({ message: 'Utilisateur supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Fonction pour modifier un utilisateur
const modifierUtilisateur = async (req, res) => {
  try {
    const utilisateurModifie = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    sendEmail();
    if (utilisateurModifie) {
      res.json(utilisateurModifie);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};






module.exports = {
  register,
  login,
  approuverCompte,
  approuverObjet,
  afficherUtilisateur,
  afficherUtilisateurId,
  afficherTousUtilisateurs,
  supprimerUtilisateur,
  modifierUtilisateur
};
