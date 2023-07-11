const Categorie = require('../models/categorie');
const utilisateur = require('../models/utilisateur')
// const nodemailer = require ('nodemailer');
const {sendEmail} = require("../utils/sendMail")


// functions : catégories

////////////    AJOUTER CATEGORIE    ///////////////
async function ajouterCategorie(req, res) {
  let categorie = new Categorie({
    nom_cat: req.body.nom_cat,
    desc_cat: req.body.desc_cat,
    nbr_objets: req.body.nbr_objets,
  });
  try {
    const nouvelleCategorie = await categorie.save();
    const users = await utilisateur.find()
    users.forEach(usr => {
      sendEmail(usr)
    })
    res.status(201).json({ message: "Catégorie ajoutée avec succès", categorie: nouvelleCategorie });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


/////////////     AFFICHER UNE CATEGORI PAR ID   /////////////////
async function afficherCategorie(req, res) {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(categorie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



////////////// AFFICHER TOUTES LES CATEGORIES    ////////////////////
async function afficherToutesCat(req, res) {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




//////////////////    SUPPRIMER UNE CATEGORIE    ///////////////////////////
async function supprimerCategorie(req, res) {
  try {
    const categorieSupprimee = await Categorie.findByIdAndRemove(req.params.id);
    if (categorieSupprimee) {
      res.json({ message: 'Catégorie supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Catégorie non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



////////////////  MODIFIER UNE CATEGORIE   ////////////////////////
async function modifierCategorie(req, res) {
  try {
    const categorieModifiee = await Categorie.findByIdAndUpdate(req.params.id, {
      nom_cat: req.body.nom_cat,
      desc_cat: req.body.desc_cat,
      nbr_objets: req.body.nbr_objets
    }, { new: true });
    res.json(categorieModifiee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


module.exports = {
  ajouterCategorie,
  afficherCategorie,
  afficherToutesCat,
  supprimerCategorie,
  modifierCategorie
};
