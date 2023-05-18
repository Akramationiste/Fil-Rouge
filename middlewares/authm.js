
const jwt = require('jsonwebtoken');
const utilisateur = require('../models/utilisateur');

async function VerifyToken(req, res, next){
  const {authorization} = req.headers;
  

  if (!authorization) {
    return res.status(401).json({ message: 'Authorisation token requis' });
  }
   
  const token = authorization.split(' ')[1]


  try {
    const {_id} = jwt.verify(token, process.env.SECRET);
    req.utilisateur = await utilisateur.findOne({_id}).select('_id')
    next();
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Invalid token' });
  }
};




async function isAdmin(req, res, next) {
	
	if (!req.utilisateur) {
		return res.status(400).send({
			message: "Connectez-vous d'abord",
		});
	}
	const utilisateur = await User.findById(req.utilisateur._id);
	if (utilisateur.role != "admin") {
		return res.status(403).send({
			message: 'non authorisé, vous devriez être admin !',
		});
	}
	next();
}


async function isProprietaire(req, res, next) {
	if (!req.user) {
		return res.status(400).send({
			message: "Connectez-vous d'abord",
		});
	}
	const utilisateur = await utilisateur.findById(req.utilisateur._id);
	if (utilisateur.role != "proprietaire") {
		return res.status(403).send({
			message: 'non authorisé, vous devriez être propriétaire !',
		});
	}
	next();
}

module.exports = {
    VerifyToken,
    isAdmin,
    isProprietaire
}











