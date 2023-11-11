require('./models/BidUser');
require('./models/Products');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes')
const requireAuth = require('./middlewares/requireAuth');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
//app.use(productRoutes);

const mongoUri = 'mongodb+srv://sshrutissingh2002:mongodbpassword@cluster0.bmiyh2k.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoUri);
mongoose.connection.on('connected',() => {
    console.log("connected to mongo instance");
})

mongoose.connection.on('error',()=>{

    console.error('error');
})
app.get('/',requireAuth,(req, res) => {

    res.send(`your email : ${req.user.email}`);
});


app.listen(3000, () => {

    console.log('listening on port 3000');
})