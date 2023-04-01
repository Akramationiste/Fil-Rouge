const express = require("express");
const router = express.Router();
const control1 = require('../controllers/objet');
const control2 = require('../controllers/categorie');
const control3 = require('../controllers/utilisateur');
const control6 = require('../controllers/location');
// const {protectEmploye} = require('../middlewhares/protectEmploye')
const auth = require('../middlewares/authm')




// Afficher tous les utilisateurs
router.get('/utilisateurs', auth, (req, res) => {
    if (req.role !== 'proprietaire') {
      return res.status(403).json({ message: 'Access denied' });
    }
    control3.afficherTousUtilisateurs(req, res);
  });
  
  // Afficher un utilisateur
  router.get('/utilisateurs/:id', auth, (req, res) => {
    if (req.role !== 'proprietaire') {
      return res.status(403).json({ message: 'Access denied' });
    }
    control3.afficherUtilisateur(req, res);
  });
  
  // Modifier un utilisateur
  router.patch('/utilisateurs/:id', auth, (req, res) => {
    if (req.role !== 'proprietaire') {
      return res.status(403).json({ message: 'Access denied' });
    }
    control3.modifierUtilisateur(req, res);
  });
  
  // Supprimer un utilisateur
  router.delete('/utilisateurs/:id', auth, (req, res) => {
    if (req.role !== 'proprietaire') {
      return res.status(403).json({ message: 'Access denied' });
    }
    control3.supprimerUtilisateur(req, res);
  });




////////////////////////////////////////////////////////////////////////////




//afficher tous les objets
router.get('/objets', control1.afficherTousObjets);


//afficher un objet
router.get('/objets/:id', control1.afficherObjet);


//ajouter un objet
router.post('/objets', control1.ajouterObjet);


//supprimer un objet
router.delete('/objets/:id', control1.supprimerObjet);




//////////////////////////////////////////////////////////////////////////////




//afficher tous les catégories
router.get('/categories', control2.afficherToutesCat);


//afficher une catégorie
router.get('/categories/:id', control2.afficherCategorie);


//ajouter une catégorie
router.post('/categories', control2.ajouterCategorie);


//supprimer une catégorie
router.delete('/categories/:id', control2.supprimerCategorie);


//modifier une catégorie
router.patch('/categories/:id', control2.modifierCategorie);



//////////////////////////////////////////////////////////////////////////////




//ajouter une location
router.post('/locations', control6.ajouterLocation);

//renouvler une location
router.post('/renouveler_locations/:id', control6.renouvelerLocation);






////////////////////////////////////////////////////////////////////////////////

//les statistiques////

router.get('/stats', control6.afficherStats);





module.exports = router;