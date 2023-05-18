const express = require("express");
const router = express.Router();
const control1 = require('../controllers/objet');
// const control2 = require('../controllers/categorie');
// const control3 = require('../controllers/utilisateur');
// const control6 = require('../controllers/location');
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


//afficher tous les objets
router.get('/objets', [authorization.VerifyToken , authorization.isAdmin], control1.afficherTousObjets);


//afficher un objet
router.get('/objets/:id', control1.afficherObjet);


//ajouter un objet
router.post('/objets', control1.ajouterObjet);


//supprimer un objet
router.delete('/objets/:id', control1.supprimerObjet);


module.exports = router;
