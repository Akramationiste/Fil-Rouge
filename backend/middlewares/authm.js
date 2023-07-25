const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/utilisateur');


//////// protection de l'utilisateur /////////

async function VerifyToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token requis' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await Utilisateur.findOne({ _id, isActive:true }).select('_id');
    
    if(!user){
      return res.status(403).send({
        message: 'Non autorisé, vous devez être approuvé par un admin !',
      });
    }

    req.utilisateur = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Invalid token' });
  }
}



//////// protection de l'admin /////////

async function isAdmin(req, res, next) {
  if (!req.utilisateur) {
    return res.status(400).send({
      message: "Connectez-vous d'abord",
    });
  }
  const utilisateur = await Utilisateur.findById(req.utilisateur._id);
  if (utilisateur.role !== 'admin') {
    return res.status(403).send({
      message: 'Non autorisé, vous devez être administrateur !',
    });
  }
  next();
}

module.exports = {
  VerifyToken,
  isAdmin,
};
