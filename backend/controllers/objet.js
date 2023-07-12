const Objet = require('../models/objet');
const Categorie = require('../models/categorie');
const multer = require ('multer');






async function ajouterObjet(req, res) {
  console.log(req.files);
  const images  = req.files.map((file)=>{
    return `./images_objets/${file.filename}`
  });
  console.log(images)
  // return res.sendStatus (200)
  const { nom_objet, cat_id, proprietaire_id, etat, prix, note, description, objet_loue } = req.body;

  try {
    const objet = new Objet({
      nom_objet,
      cat_id,
      proprietaire_id,
      etat,
      prix,
      note,
      description,
      image: images,
      objet_loue
    });

    const categorie = await Categorie.findByIdAndUpdate(
      cat_id,
      { $inc: { nbr_objets: 1 } },
      { new: true }
    );

    await objet.save();

    res.status(201).json({ objet, categorie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




async function afficherObjet(req, res){
    let objet
    try{
        objet = await Objet.findById(req.params.id)
        if (objet == null) {
            return res.status(404).json({ message: 'Objet non trouvé' });
        }
        res.json(objet);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};






async function afficherObjetFiltre(req, res) {
  try {
    let filters = {};
    if (req.query.note) {
      filters.note = req.query.note;
    }
    if (req.query.etat) {
      filters.etat = req.query.etat;
    }
    if (req.query.prix) {
      filters.prix = req.query.prix;
    }
    if (req.query.cat_id) {
      filters.cat_id = req.query.cat_id;
    }
    const objets = await Objet.find(filters).populate('cat_id');
    res.status(200).json(objets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




async function afficherTousObjets(req, res){
    try {
        const objets = await Objet.find();
        res.json(objets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

async function supprimerObjet(req, res){
    let objetSupprime 
    try {
        objetSupprime = await Objet.findByIdAndRemove(req.params.id); 
        if (objetSupprime) {
            res.json({ message: 'Objet supprimé avec succès' }); 
        } else {
            res.status(404).json({ message: 'Objet non trouvé' }); 
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    };
}

module.exports = {
    ajouterObjet,
    afficherObjetFiltre,
    afficherObjet,
    afficherTousObjets,
    supprimerObjet
};
