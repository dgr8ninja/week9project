const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const bcrypt = require("bcrypt");
const app = express();
const session = require('express-session');
const Sequelize = require('sequelize');
const models = require('./models');
const router = express.Router();

app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session({
        secret: "Week9Project",
        resave: false,
        saveUninitialized: true
    })
);

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("account/register");
});

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
});

app.post('/dashboard', function(req, res) {
    console.log(req.body.AddSym)
    let something = models.Symptom_history.build({
        user_input: req.body.AddSym
    })
    something.save()
    console.log(something)
});

app.get("/login", (req, res) => {
    let data = {};
    if (req.query.registeredSuccessfully) data.registeredSuccessfully = true;
    if (req.query.loggedOutSuccessfully) data.loggedOutSuccessfully = true;
    res.render("account/login", data);
});

app.post("/login", async function(req, res) {
    let emailAddress = req.body.email;
    let password = req.body.password;
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
                req.session.user_id = emailAddress;
                res.redirect("home");
            })
        }
    })
});

app.get("/logout", (req, res) => {
    let data = {};
    req.session.destroy();
    res.redirect("/login?loggedOutSuccessfully=true");
});

app.post('/Treatment', function(req, res) {
    let symptomid = req.body.Symptoms
    console.log(symptomid)
    res.redirect(`/Symptoms/${symptomid}`)
});

app.get("/Symptoms/:id", async(req, res) => {
    let data = {};
    data.treat = await models.Treatments.findOne({
        where: { id: req.params.id }
    });
    data.img = await models.Images.findOne({
        where: { id: req.params.id }
    });
    res.render("treatmentpage", data);
});

app.get('/home', async function(req, res) {
    let data = {}
    data.vehicles = await models.vehicles.findAll();
    data.symptoms = await models.Symptoms.findAll();
    res.render('Home', data)
});

app.get('/dashboard', async function(req, res) {
    let data = {}
    data.symptoms = await models.Symptoms.findAll();
    res.render('dashboard', data)
});

app.listen(port, () => {
    console.log(`Port ${port} is listening`)
});