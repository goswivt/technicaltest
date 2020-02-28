const express = require("express");

const bodyParser = require("body-parser");
const user = require('./routes/user');
const session = require ('express-session');
const path = require('path');
const request = require('request');
const dotenv = require("dotenv").config();
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

//Import View 
app.set('view engine', 'ejs')

// Middleware
app.use(bodyParser.json());
app.use("/user", user);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


//API Routes

app.get("/", (req, res) => {
  res.render("login" );
});

app.get("/signup", (req, res) =>{
  res.render("signup");
});

//API Data Rendering
app.get('/dashboard', function (req, res) {
  res.render('dashboard', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let url =`http://api.openweathermap.org/data/2.5/weather?q=Hong+Kong,hk&units=metric&appid=${process.env.API_KEY}`
 request (url, function(err, response, body) {
    if(err){
      res.render('dashboard', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('dashboard', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;        
        res.render('dashboard', {weather: weatherText, error: null});
      }
    }
  });
})


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});