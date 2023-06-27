const nodemailer = require('nodemailer');
const utilisateur = require('../models/utilisateur');

//loads environment variables from a .env file
require('dotenv').config();


//importer the nodemailer library to send emails
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
  });


//function to send an email

function sendEmail(from , to ,subject , text){
     
    const message = {
        from: `${from}`,
        to: `${to}`,
        subject: `${subject}`,
        text: `${text}`
    };
  
    transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log("'Error sending email' ");
          // res.status(500).send({ error: 'Error sending email' });
        } else {
          console.log('Email envoyé: ' + info.response);
          // res.status(200).json("email envoyé !");
        }
    });


  }


async function sendEmailToMultipleUsers(from , to ,subject , text){

  to.forEach(utilisateur => {

      sendEmail(from , utilisateur.email , subject , text)
    
  });

}
module.exports={
    sendEmail,
    sendEmailToMultipleUsers
}  