const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRouter = require('./routes/api');
const authRouter = require('./routes/api');

const authMiddleware = require('./middlewares/authm');
const mongoose = require('mongoose');
const multer = require ('multer');
mongoose.set('strictQuery', true);
// register auth routes
app.use('/auth', authRouter);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/api', apiRouter);



// connect to mongodb
mongoose.connect('mongodb+srv://filrouge:filrouge@cluster-fil-rouge.veabst2.mongodb.net/?retryWrites=true&w=majority');
app.listen(3000, () => console.log('Server started'));


mongoose.connection.once('open', function(){
    console.log('Connection has been made, abda takhdam...');
}).on('error', function(error){
    console.log('Connection error:', error);
});

// //storage
// const Storage = multer.diskStorage({
//     destination: 'uploads',
//     filename:(req, file, cb) => {
//         cb(null, file.originalname)
//     },
// });

// const upload = multer({
//     storage: Storage,
// }).single('testImage')


app.get("/" , (req, res)=>{
    sendEmail()
    .then(response => res.send (response.message))
    .catch(error => res.status(500).send(error.message))
})






app.use(express.json());

