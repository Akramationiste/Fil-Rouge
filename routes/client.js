const express = require("express");
const router = express.Router();
const control1 = require('../controllers/objet');
const control2 = require('../controllers/categorie');
const control4 = require('../controllers/commentaire');
const control5 = require('../controllers/reponse');
const control6 = require('../controllers/location');


//afficher tous les objets
router.get('/objets', control1.afficherTousObjets);


//afficher un objet
router.get('/objets/:id', control1.afficherObjet);


//afficher un objets par filtre
router.get('/objets_filtres', control1.afficherObjetFiltre);



/////////////////////////////////////////////////////////////////



//afficher tous les catégories
router.get('/categories', control2.afficherToutesCat);


//afficher une catégorie
router.get('/cateories/:id', control2.afficherCategorie);



/////////////////////////////////////////////////////////////////



//afficher un commentaire
router.get('/commentaires/:id', control4.afficherCommentaire);


//ajouter un commentaire
router.post('/commentaires', control4.ajouterCommentaire);


//supprimer un commentaire
router.delete('/commentaires/:id', control4.supprimerCommentaire);


//modifier un commentaire
router.patch('/commentaires/:id', control4.modifierCommentaire);




/////////////////////////////////////////////////////////////////



//afficher une réponse
router.get('/reponses/:id', control5.afficherReponse);


//ajouter une reponse
router.post('/reponses', control5.ajouterReponse);


//supprimer une reponse
router.delete('/reponses/:id', control5.supprimerReponse);


//modifier une reponse
router.patch('/reponses/:id', control5.modifierReponse);



/////////////////////////////////////////////////////////////////


//afficher l'historique
router.get('/locations_histo/:user_id', control6.voirHistorique);



module.exports = router;