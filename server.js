require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//Start server
const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(express.json());

app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));


mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(result => {
    console.log("Connected to database");
    console.log(`Listening on ${PORT}`);
    app.listen(PORT || 3000);
  })
  .catch(err => {
    console.log("Error connecting to database");
  });