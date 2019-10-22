const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const session = require('express-session');
const models = require("./models");
const app = express();

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


app.get ('/Home', function(req, res) {
    res.render('homelayout')
});
app.get ('/logon', function(req, res) {
    res.render('Home')
});
app.get('/register', function(req, res) {
    res.render('register')
});
app.get("/Symptoms", async(req,res)=>{
    let data = {};
    data.symptoms = await models.Symptoms.findAll();
    res.render("symptomspage",data);
});
app.get("/Symptoms/:id", async(req,res)=>{
    console.log("fuck");
    let data = {};
    console.log(req.params.id)
    data.treat =  await models.Treatments.findOne({
      where: { id: req.params.id }
      
    });
    res.render("treatmentpage",data);   
});
app.listen(port, () => {
    console.log(`Port ${port} is listening`);
});