const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({

    email_n: {
        type: String,
        required : true
    }
});


module.exports = mongoose.model('newsletter', NewsletterSchema);