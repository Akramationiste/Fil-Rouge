const express = require("express");
const router = express.Router();
const control1 = require('../controllers/objet');
const control2 = require('../controllers/utilisateur');
const control3 = require('../controllers/commentaire');
const control4 = require('../controllers/categorie');
const authorization = require('../middlewares/authm')



////////////////////////////////////////////////////////////////////////////


router.put("/utilisateur/:id/status", (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        console.log(foundUser.isActive);
        if (err) {
            console.log(err);
        } else if (foundUser.isActive == false) {
            User.update({_id: req.params.id}, {$set: {isActive: true}});
            res.redirect("/admin/users-details");
        } else {
            User.update({_id: req.params.id}, {$set: {isActive: false}});
            res.redirect("/admin/users-details");
        }
    });
});


////////////////////////////////////////////////////////////////////////////




// Afficher toutes les catégories
router.get('/categories', control4.afficherToutesCat);

// Supprimer une catégorie
router.delete('/categories/:id', control4.supprimerCategorie);

// Modifier une catégorie
router.patch('/categories/:id', control4.modifierCategorie);



////////////////////////////////////////////////////////////////////////////


// supprimer un utilisateur 
router.delete('/utilisateurs/:id', control2.supprimerUtilisateur);


// afficher tous les utilisateurs 
router.get('/utilisateurs/', control2.afficherTousUtilisateurs);



////////////////////////////////////////////////////////////////////////////


// supprimer un commentaire 
router.delete('/commentaires/:id', control3.supprimerCommentaire);


// afficher tous les commentaires 
router.get('/commentaires/', control3.afficherTousCom);


////////////////////////////////////////////////////////////////////////////


//afficher tous les objets
router.get('/objets', control1.afficherTousObjetsAd);


//afficher un objet
router.get('/objets/:id', control1.afficherObjet);


//ajouter un objet
router.post('/objets', control1.ajouterObjet);


//supprimer un objet
router.delete('/objets/:id', control1.supprimerObjet);


////////////////////////////////////////////////////////////////////////////

//afficher les statistique pour l'admin
router.get('/Stats', control2.Stats);


module.exports = router;
