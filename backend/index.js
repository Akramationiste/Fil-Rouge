const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRouter = require('./routes/api');
const authRouter = require('./routes/authr');
const cors = require ('cors');
// const authMiddleware = require('./middlewares/authm');
const mongoose = require('mongoose');
const multer = require ('multer');
mongoose.set('strictQuery', true);


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// register auth routes

app.use('/auth', authRouter);



// other routes

app.use('/api', apiRouter);



// connect to mongodb

mongoose.connect(process.env.MONGODB_URI);
app.listen(3000, () => console.log('Server started'));


mongoose.connection.once('open', function(){
    console.log('Connection has been made, abda takhdam...');
}).on('error', function(error){
    console.log('Connection error:', error);
});


app.get("/" , (req, res)=>{
    sendEmail()
    .then(response => res.send (response.message))
    .catch(error => res.status(500).send(error.message))
})






app.use(express.json());

