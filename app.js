const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;
const session = require('express-session');
const db = require("./database");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require('./models');
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

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("account/register");
});

//app.use("/account", accountRouter);

app.get("/login", (req, res) => {
    let data = {};
    if (req.query.registeredSuccessfully) data.registeredSuccessfully = true;
    if (req.query.loggedOutSuccessfully) data.loggedOutSuccessfully = true;
    res.render("account/login", data);
});

app.get("/logout", (req, res) => {
    let data = {};
    // data.email = "";
    // data.password = "";
    req.session.destroy();
    res.redirect("/login?loggedOutSuccessfully=true");
});


app.post("/login", async function(req, res) {
    let emailAddress = req.body.email;
    let password = req.body.password;
    console.log("EMAIL = " + emailAddress + " | Password = " + password)
    models.users.findOne({
        where: {
            email: emailAddress
        }
    }).then((user) => {
        if (!user) {
            res.redirect("/login");
        } else {
            bcrypt.compare(password, user.password, (err, same) => {
                if (err) throw err;
                if (!same) res.redirect("/login");
                console.log("TEXAS A&M - UTSA");
                req.session.user_id = emailAddress;
                res.redirect("/account/register"); // <=== needs to be updated to whatever our main page is called
            })
        }
    })
})

app.post("/register", async function(req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let emailAddress = email;
    let password = req.body.password;

    models.users.findOne({
        where: {
            email: email
        }
    }).then((email) => {
        if (email) {
            res.status(500).json({ message: 'This E-Mail already exists, please try another.' });
        } else {
            bcrypt.hash(password, 10, (error, hash) => {
                if (!error) {
                    let users = models.users.build({
                        email: emailAddress,
                        password: hash,
                        first_name: firstName,
                        last_name: lastName
                    })
                    users.save();
                    res.redirect("/login?registeredSuccessfully=true");
                }
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Port ${port} is listening`);
});

app.get ('/home', async function (req, res)  {
    let data = {}
    data.vehicles = await models.vehicles.findAll();
    res.render('Home', data)
});

app.get ('/logon', function(req, res) {
    res.render('Home')
});

app.get('/register', async (req, res) => {
    res.render('register')
});


