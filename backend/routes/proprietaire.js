const express = require("express");
const router = express.Router();
const control1 = require('../controllers/objet');
const control2 = require('../controllers/categorie');
 const control6 = require('../controllers/location');
const authorization = require('../middlewares/authm');
const multer = require ('multer');



////////////////////////////////////////////////////////////////////////////


const upload = multer({
    storage: multer.diskStorage({
        destination: function(req,file,callback) {
            callback(null, path.join(__dirname, "../images_objets") )
        },
        filename: function (req, file, callback) {
            callback(null, `${Date.now().toString()}.jpeg`)
        }
    })
  })

//afficher tous les objets
router.get('/objets', control1.afficherTousObjets);


//afficher un objet
router.get('/objets/:id', control1.afficherObjet);


//ajouter un objet
router.post('/objets', upload.array, control1.ajouterObjet);


//supprimer un objet
router.delete('/objets/:id', control1.supprimerObjet);




//////////////////////////////////////////////////////////////////////////////




//afficher tous les catégories
router.get('/categories', control2.afficherToutesCat);


//afficher une catégorie
router.get('/categories/:id', control2.afficherCategorie);


//ajouter une catégorie
router.post('/categories', [authorization.VerifyToken , authorization.isProprietaire], control2.ajouterCategorie);


//supprimer une catégorie
router.delete('/categories/:id', [authorization.VerifyToken , authorization.isProprietaire], control2.supprimerCategorie);


//modifier une catégorie
router.patch('/categories/:id', [authorization.VerifyToken , authorization.isProprietaire], control2.modifierCategorie);



//////////////////////////////////////////////////////////////////////////////




//ajouter une location
router.post('/locations', [authorization.VerifyToken , authorization.isProprietaire], control6.ajouterLocation);

//renouvler une location
router.post('/renouveler_locations/:id', [authorization.VerifyToken , authorization.isProprietaire], control6.renouvelerLocation);






////////////////////////////////////////////////////////////////////////////////

//les statistiques////

router.get('/stats', control6.afficherStats);





module.exports = router;