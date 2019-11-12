const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = 4000;

var router = require('./api')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology' , true);

var db = "mongodb+srv://admin:admin@cluster0-pvipx.mongodb.net/TodoList?retryWrites=true&w=majority"

mongoose.connect(db, err => {
  if (err) {
    console.log("Connot connect to Database " + err)
  }
  else {
    console.log("Database Connected")
  }
})

app.use('/api', router)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});