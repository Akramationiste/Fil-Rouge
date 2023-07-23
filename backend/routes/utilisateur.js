const express = require("express");
const router = express.Router();
const Categorie = require('../models/categorie');
const control0 = require('../controllers/utilisateur');
const control1 = require('../controllers/objet');
const control2 = require('../controllers/categorie');
const control4 = require('../controllers/commentaire');
const control5 = require('../controllers/reponse');
const control6 = require('../controllers/location');
const control7 = require('../controllers/newsletter');
const authorization = require('../middlewares/authm');
const multer = require ('multer');
const path = require('path');





const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      console.log("1");
      callback(null, path.join(__dirname, '../public/images_objets'));
    },
    filename: function (req, file, callback) {
      console.log("2");
      console.log({ file });
      callback(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});
  
  



// Afficher un utilisateur (profil)
router.get('/profil/:id', control0.afficherUtilisateur);


// Afficher un utilisateur (pour l'objet)
router.get('/utilisateurs/:id', control0.afficherUtilisateurId);

// supprimer un utilisateur 
router.delete('/utilisateurs/:id', control0.supprimerUtilisateur);

// modifier un utilisateur 
router.patch('/utilisateurs/:id', control0.modifierUtilisateur);


////////////////////////////////////////////////////////////////////////

// Ajouter un objet
router.post('/objets', upload.array('files', 4), control1.ajouterObjet);

// Afficher tous les objets
router.get('/objets', control1.afficherTousObjets);

// Afficher tous les objets par catégories
router.get('/objetsCat/:id', control1.afficherTousObjetsCat);

// Afficher tous les objets par propriétaire
router.get('/objetsCat/:id', control1.afficherTousObjetsUser);

// Afficher un objet
router.get('/objets/:id', control1.afficherObjet);

// Afficher un objet par filtre
router.get('/objets_filtres', control1.afficherObjetFiltre);

// Supprimer un objet
router.delete('/objets/:id', control1.supprimerObjet);

// Afficher les deux derniers objets ajoutés
router.get('/derniersObjets', control1.afficherDerniersObjets);






// Afficher toutes les catégories
router.get('/categories', control2.afficherToutesCat);

// Afficher les quatre dernières catégories
router.get('/categories/dernieres', control2.afficherQuatreDernieresCat);

// Afficher une catégorie
router.get('/categories/:id', control2.afficherCategorie);

// Ajouter une catégorie
router.post('/categories', control2.ajouterCategorie);

// Supprimer une catégorie
router.delete('/categories/:id', control2.supprimerCategorie);

// Modifier une catégorie
router.patch('/categories/:id', control2.modifierCategorie);







///////// Récupérez uniquement le champ 'nom_cat'


router.get('/nomCategories', async (req, res) => {
    try {
      const categories = await Categorie.find({}, 'nom_cat'); 
      res.json({ categories });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




// Afficher un commentaire
router.get('/commentaires/:id', control4.afficherCommentaire);

// // Afficher tous les commentaires
// router.get('/commentaires/objets/:id', control4.afficherTousCom);

// Afficher tous les commentaires pour objet
router.get('/commentaires/objets/:id', control4.afficherTousComId);

// Ajouter un commentaire
router.post('/commentaires', control4.ajouterCommentaire);

// Supprimer un commentaire
router.delete('/commentaires/:id', control4.supprimerCommentaire);

// Modifier un commentaire
router.patch('/commentaires/:id', control4.modifierCommentaire);





// Afficher une réponse
router.get('/reponses/:id', control5.afficherReponse);

// Ajouter une réponse
router.post('/reponses', control5.ajouterReponse);

// Supprimer une réponse
router.delete('/reponses/:id', control5.supprimerReponse);

// Modifier une réponse
router.patch('/reponses/:id', control5.modifierReponse);





// Afficher l'historique
router.get('/locations_histo/:id', control6.voirHistorique);





// Ajouter une location
router.post('/locations', [authorization.VerifyToken], control6.ajouterLocation);

// Renouveler une location
router.post('/renouveler_locations/:id', [authorization.VerifyToken], control6.renouvelerLocation);





// La recherche 
router.get('/recherche', control1.rechercherObjetParNom);

// Les statistiques
router.get('/stats', control6.afficherStats);


// Newsletter 
router.post('/newsletter', control7.ajouterEmail)



module.exports = router;
