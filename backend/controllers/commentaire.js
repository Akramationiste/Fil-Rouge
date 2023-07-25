const Commentaire = require('../models/commentaire');
const Objet = require('../models/objet');
const Utilisateur = require('../models/utilisateur');



//////// Ajouter un commentaire //////////////////////

async function ajouterCommentaire(req, res) {
    const { user_id, objet_id, comment } = req.body;
    try {
      // Vérifier si l'utilisateur existe
      const utilisateurExiste = await Utilisateur.exists({ _id: user_id });
      if (!utilisateurExiste) {
        throw new Error('Utilisateur introuvable');
      }
  
      const commentaire =  await Commentaire.create({ user_id, objet_id, comment });
      res.sendStatus(200)
    } catch (err) {
      console.log(err.message);
      res.status(500).send(`Erreur lors de l'ajout du commentaire : ${err.message}`);
    }
  }
  


////////////afficher un commentaire/////////////////:

async function afficherCommentaire(req, res){
    let commentaire
    try{
        commentaire = await Commentaire.findById(req.params.id)
        if (commentaire == null) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
        res.json(commentaire);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};



// Fonction pour afficher tous les commentaires ////////////////////////

const afficherTousCom = async (req, res) => {
  try {
    const commentaires = await Commentaire.find();
    res.json(commentaires);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Fonction pour afficher tous les commentaires (objet) ////////////////////

const afficherTousComId = async (req, res) => {
  try {

    const objetId = req.params.id


    const commentaires = await Commentaire.find({objet_id:objetId}).populate('user_id','nom ');
    res.json(commentaires);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



////////////supprimer un commentaire/////////////////:

async function supprimerCommentaire(req, res){
    let commentaireSupprime 
    try {
        commentaireSupprime = await Commentaire.findByIdAndRemove(req.params.id); 
        if (commentaireSupprime) {
            res.json({ message: 'commentaire supprimé avec succès' }); 
        } else {
            res.status(404).json({ message: 'commentaire non trouvé' }); 
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    };
}


////////////modifier un commentaire/////////////////:

async function modifierCommentaire(req, res) {
  try {
      const commentaireModifie = await Commentaire.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if (!commentaireModifie) {
          return res.status(404).json({message: "Le commentaire n'a pas été trouvé."});
      }
      res.json(commentaireModifie);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};



module.exports = {
    afficherCommentaire,
    afficherTousCom,
    afficherTousComId,
    ajouterCommentaire,
    supprimerCommentaire,
    modifierCommentaire
};