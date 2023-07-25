const Objet = require('../models/objet');
const Location = require('../models/location');
const Utilisateur = require("../models/utilisateur");







///////////// CREER LOCATION ////////////////////

async function ajouterLocation(req, res) {
  try {
    const objet = await Objet.findById(req.body.objet_id);

    if (!objet) {
      return res.status(404).json({ message: "Objet introuvable" });
    }

    if (objet.objet_loue == true) {
      return res.status(400).json({ message: "Cet Objet n'est plus disponible" });
    }

const location = new Location({
  user_id: req.body.user_id,
  objet_id: req.body.objet_id,
  date_location: req.body.date_location || new Date(),
  jours: req.body.jours || 14,
  date_retour: new Date(Date.now() + (req.body.jours || 14) * 24 * 60 * 60 * 1000) //calcul de la date de retour
});

await location.save();
objet.objet_loue == true;
await objet.save();

res.status(201).json({ message: "Location ajoutée avec succès", location, date_retour: location.date_retour });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

  



///////// RENOUVELLEMENT ////////////////////////////



async function renouvelerLocation(req,res) {
  try {
    const {id} = req.params
    const location = await Location.findById(id);

    if (!location) {
      throw new Error('Location non trouvé');
    }

    if (location.date_retour <= new Date()) {
      throw new Error('Location en retard, pénalité de suspension de 10 jours appliquée');
    }

    const joursSupplementaires = 7;
    const dateRetour = new Date(location.date_retour).getTime() + (joursSupplementaires * 24 * 60 * 60 * 1000);
    console.log(location)
    location.date_retour = new Date(dateRetour);
    const locationModifie = await location.save();
    res.status(200).json({ message: 'Prêt renouvelé avec succès', location: locationModifie})
  } catch (err) {
    console.error(err);
    throw new Error(`Erreur lors du renouvellement du prêt : ${err.message}`);
  }
}


  
///////////  HISTORIQUE   ///////////////////


async function voirHistorique(req, res) {
  try {
    console.log(req.params.user_id)
    const location = await Location.find({ user_id: req.params.user_id });
    console.log(location)
    res.send(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


  



////////////// STATISTIQUES ///////////////////


async function afficherStats(req,res) {
  try {
    const [totalLocations, totalObjets, objetsPlusLoues] = await Promise.all([
      Location.countDocuments(),
      Objet.countDocuments(),
      Utilisateur.countDocuments(),
      Location.aggregate([
        { $group: { _id: "$objet_id", count: { $sum: 1 } } },
        { $lookup: { from: "objets", localField: "_id", foreignField: "_id", as: "objet" } },
        { $unwind: "$objet" },
        { $project: { nom_objet: "$objet.nom_objet", count: 1 } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    res.status(200).json({totalLocations, totalObjets, objetsPlusLoues })
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des statistiques : ${err.message}`);
  }
}







  module.exports = {
    ajouterLocation,
    voirHistorique,
    renouvelerLocation,
    afficherStats
};