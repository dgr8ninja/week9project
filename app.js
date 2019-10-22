const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require("bcrypt");
const app = express();
const port = 3000;
const session = require('express-session');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//const models = require('./models');
const accountRouter = require('./routes/account');
const pgp = require('pg-promise')();

app.set("view engine", "pug");

app.use(
    session({
        secret: "Week9Project",
        resave: false,
        saveUninitialized: true
    })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/account", accountRouter);

app.get("/", function(req, res) {
    res.render("index", { title: "Hey", message: "Howdy!" });
});


app.get ('/home', function(req, res) {
    res.render('home')
});
app.get ('/login', function(req, res) {
    res.render('login')
});
app.get('/register', function(req, res) {
    res.render('register')
});

app.listen(port, () => {
    console.log(`Port ${port} is listening`);
});