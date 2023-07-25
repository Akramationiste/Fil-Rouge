const Newsletter = require('../models/newsletter');
const { sendEmail } = require('../utils/sendMail');




///////// fonction pour la newsletter ///////////////

const ajouterEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const exists = await Newsletter.findOne({ email_n: email });

    if (exists) {
      throw new Error('Vous êtes déjà inscrits');
    }

    const newEmail = await Newsletter.create({ email_n: email });

    const from = 'votre-adresse-email@gmail.com';
    const subject = 'fabrikri : newsletter';
    const text = 'Merci pour votre abonnement à notre newsletter !';

    sendEmail(from, email, subject, text);

    res.status(201).json({ message: 'Inscription réussie !' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  ajouterEmail,
};

