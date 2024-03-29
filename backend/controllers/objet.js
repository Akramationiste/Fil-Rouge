const Objet = require('../models/objet');
const Categorie = require('../models/categorie');



//////// ajouter objet ///////////////////


async function ajouterObjet(req, res) {
  console.log({body:req.body});
  console.log({files: req.files}); 
  const images = req.files.map((file) => {
    return `./images_objets/${file.filename}`;
  });
  console.log({images});

  const { nom_objet, cat_id, proprietaire_id, etat, prix, wilaya, description, objet_loue } = req.body;
  console.log({ nom_objet, cat_id, proprietaire_id, etat, prix, wilaya, description, objet_loue });
  try {
    const objet = new Objet({
      nom_objet,
      cat_id,
      proprietaire_id,
      etat,
      prix,
      wilaya,
      description,
      objet_loue,
    });

    images.forEach(image => {
      objet.image.push(image)
    });

    console.log({objet});

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






//////// afficher objet ///////////////////

async function afficherObjet(req, res){
    
    try{
       let objet = await Objet.findById(req.params.id)
        if (objet == null) {
            return res.status(404).json({ message: 'Objet non trouvé' });
        }
        res.json(objet);
    } catch (err) {
      console.log({objet: err})
        return res.status(500).json({ message: err.message })
    }
};




//////// afficher objet par filtre ///////////////////

async function afficherObjetFiltre(req, res) {
  try {
    let filters = {};
    if (req.query.wilaya) {
      filters.wilaya = req.query.wilaya;
    }
    if (req.query.etat) {
      filters.etat = req.query.etat;
    }

    const objets = await Objet.find(filters).populate("cat_id");
    res.status(200).json(objets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}





//////// afficher tous les objets ///////////////////

async function afficherTousObjets(req, res){
  try {
    console.log(req.query)
    const {page, limit} = req.query;
    const count = await Objet.countDocuments();
    const totalPages = Math.ceil(count/10);
    if(page > totalPages){
      page = totalPages
    }
      const objets = await Objet.find().limit(limit).skip(limit * (page-1));
      res.json({objets, totalPages, page, count});
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};



//////// afficher tous les objets por l'admin ///////////////////

async function afficherTousObjetsAd(req, res){
  try {
    console.log(req.query)
    const {page, limit} = req.query;
    const count = await Objet.countDocuments();
    const totalPages = Math.ceil(count/10);
    if(page > totalPages){
      page = totalPages
    }
      const objets = await Objet.find().limit(limit).skip(limit * (page-1));
      res.json({objets, totalPages, page, count});
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};




///////// afficher les objets par catégorie ////////////// 

async function afficherTousObjetsCat(req, res) {
  try {
    const { page, limit } = req.query;
    const cat_id = req.params.id;
    const count = cat_id
      ? await Objet.countDocuments({ cat_id })
      : await Objet.countDocuments();

    const totalPages = Math.ceil(count / limit);

    let objets;

    if (cat_id) {
      objets = await Objet.find({ cat_id })
        .limit(parseInt(limit))
        .skip(parseInt(limit) * (parseInt(page) - 1));
    } else {
      objets = await Objet.find()
        .limit(parseInt(limit))
        .skip(parseInt(limit) * (parseInt(page) - 1));
    }

    res.json({ objets, totalPages, page, count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



///////// afficher les objets par propriétaire ////////////// 

async function afficherTousObjetsUser(req, res) {
  console.log(req.params.id);
  try {
    const { page, limit } = req.query;
    const proprietaire_id = req.params.id;
    const count = await Objet.countDocuments({ proprietaire_id });
  

    const totalPages = Math.ceil(count / limit);

    const objets = await Objet.find({ proprietaire_id })
      .limit(parseInt(limit))
      .skip(parseInt(limit) * (parseInt(page) - 1));

    res.json({ objets, totalPages, page, count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}






///////// supprimer objet /////////////////////

async function supprimerObjet(req, res) {
  let objetSupprime;
  try {
    objetSupprime = await Objet.findByIdAndRemove(req.params.id);
    if (objetSupprime) {
      await Categorie.findByIdAndUpdate(
        objetSupprime.cat_id,
        { $inc: { nbr_objets: -1 } },
        { new: true }
      );
      res.json({ message: 'Objet supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Objet non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// Fonction pour afficher les deux derniers objets ajoutés
async function afficherDerniersObjets(req, res) {
  try {
    const objets = await Objet.find()
      .sort({ _id: -1 }) 
      .limit(2); 

    res.status(200).json(objets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



//////// rechercher objet par nom ///////////////////

async function rechercherObjetParNom(req, res) {
  const { nom } = req.query;
  try {
    const regex = new RegExp(nom, "i");
    const objets = await Objet.find({ nom_objet: regex }).populate("cat_id");
    res.status(200).json(objets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
    ajouterObjet,
    afficherObjetFiltre,
    afficherObjet,
    afficherTousObjets,
    afficherTousObjetsCat,
    afficherTousObjetsUser,
    afficherTousObjetsAd,
    supprimerObjet,
    afficherDerniersObjets,
    rechercherObjetParNom
};
