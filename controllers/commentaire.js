const Commentaire = require('../models/commentaire');
const Objet = require('../models/objet');
const Utilisateur = require('../models/utilisateur');


async function ajouterCommentaire(req, res) {
    const { user_id, objet_id, comment } = req.body;
    try {
      // Vérifier si l'utilisateur existe
      const utilisateurExiste = await Utilisateur.exists({ _id: user_id });
      if (!utilisateurExiste) {
        throw new Error('Utilisateur introuvable');
      }
  
      const commentaire = new Commentaire({ user_id, objet_id, comment });
      await commentaire.save();
  
      // Supprimer le commentaire si l'objet commenté est supprimé
      try {
        const objet = await Objet.findById(objet_id);
        if (!objet) {
          await Commentaire.deleteOne({ _id: commentaire._id });
          console.log(`Commentaire avec l'id ${commentaire._id} supprimé car l'objet associé est introuvable`);
        }
        res.status(200).send("Commentaire ajouté avec succès");
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Erreur lors de l'ajout du commentaire");
      }
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
    ajouterCommentaire,
    supprimerCommentaire,
    modifierCommentaire
};