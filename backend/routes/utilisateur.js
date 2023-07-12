const express = require("express");
const router = express.Router();
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
        destination: function(req, file, callback) {
            callback(null, path.join(__dirname, "../images_objets"))
        },
        filename: function (req, file, callback) {
            callback(null, `${Date.now().toString()}-${file.originalname}`)
        }
    })
});




// Afficher tous les objets
router.get('/objets', control1.afficherTousObjets);

// Afficher un objet
router.get('/objets/:id', control1.afficherObjet);

// Afficher un objet par filtre
router.get('/objets_filtres', control1.afficherObjetFiltre);

// Ajouter un objet
router.post('/objets', upload.array('files'), control1.ajouterObjet);

// Supprimer un objet
router.delete('/objets/:id', control1.supprimerObjet);






// Afficher toutes les catégories
router.get('/categories', control2.afficherToutesCat);

// Afficher une catégorie
router.get('/categories/:id', control2.afficherCategorie);

// Ajouter une catégorie
router.post('/categories', [authorization.VerifyToken], control2.ajouterCategorie);

// Supprimer une catégorie
router.delete('/categories/:id', [authorization.VerifyToken], control2.supprimerCategorie);

// Modifier une catégorie
router.patch('/categories/:id', [authorization.VerifyToken], control2.modifierCategorie);





// Afficher un commentaire
router.get('/commentaires/:id', control4.afficherCommentaire);

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
router.get('/locations_histo/:user_id', control6.voirHistorique);





// Ajouter une location
router.post('/locations', [authorization.VerifyToken], control6.ajouterLocation);

// Renouveler une location
router.post('/renouveler_locations/:id', [authorization.VerifyToken], control6.renouvelerLocation);





// Les statistiques
router.get('/stats', control6.afficherStats);


// Newsletter 
router.post('/newsletter', control7.ajouterEmail)



module.exports = router;
