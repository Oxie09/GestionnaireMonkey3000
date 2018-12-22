const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const path = require('path')
const models = require('./models');
const Sequelize = require('sequelize');
const pug = require('pug');

// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a bit of logging
app.use(morgan('short'))

//Pour les images
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug')
app.use('/static', express.static(__dirname + '/public'));

//Association
//models.Singe.belongsTo(models.Enclos);
//models.Enclos.hasMany(models.Singe, { as: "Singes" });

app.get('/', function(req,res) {
	res.render('index');
})

//récupérer tout les singes
app.get('/singe', function(req, res) {
  models.Singe.findAll()
    .then((singe) => {
      res.render('singe', {title : 'Les singes', singes: singe})
    })
})

//création d'un singe
app.post('/singe', function(req, res) {
  models.Singe.create({
    name: req.body.name,
    age: req.body.age,
    poids: req.body.poids,
    sexe: req.body.sexe,
    descrition: req.body.descrition
  })
    .then(() => {
      res.render('singeajoute')
    })

})

//récuperer un seul singe
app.get('/pagesinge/:id', function(req, res){
  models.Singe.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((singe) => {
      res.render('pagesinge', {singes: singe})
    })
})

//modifier singe
app.get('/modifiersinge/:id', function(req,res){
	res.render(('modifsinge'), { id: req.params.id })
})
app.post('/singe/update/:id', function(req, res){
  models.Singe.update(
    req.body,
    {
      where: {
      id: req.params.id
      }
    }, {name: req.body.name, age: req.body.age, poids: req.body.poids, sexe: req.body.sexe, descrition: req.body.descrition})
    .then(() => {
     res.render('modiffait')
    })
	.catch((err) =>{
		res.json(err)
	})
})

//supprimer un singe
app.post('/singe/name', function(req, res) {
  models.Singe.destroy({
    where: {
      name: req.body.name
    }
  })
  .then(() => {
    res.redirect('/singe');
  })
})

//Lier singe
app.get('/lier_singe/:id', function (req, res) {
    var m_Enclos = [];

    
    models.Enclos.findAll()
        .then((enclos) => {

            m_Enclos = enclos;
        })
        .then(() => {
            res.render('lier_singe', { id_singe: req.params.id, enclos: m_Enclos });
        })
    
})

//Lier singe a un enclos
/*app.get('/lier_singe_enclos/:id_singe/:id_enclos', function (req, res) {
    var m_Enclos;
    var m_Monkey;
    models.Singe.findOne({ where: { id: req.params.id_singe } })
        .then((singe) => {
             m_Monkey = singe;
        })
    models.Enclos.findOne({ where: { id: req.params.id_enclos } })
        .then((enclos) => {
            m_Enclos = enclos;
            
            enclos.addSinge(m_Monkey);
            
        })
        .then(() => {
            
           
            res.render('lier_enclos_singes');
        })
})*/

//récupérer tout les enclos
app.get('/enclos', function(req, res) {
  models.Enclos.findAll()
    .then((enclos) => {
      res.render('enclos', {title : 'Les enclos', desenclos: enclos})
    })
    
})

//création d'un enclos
app.post('/enclos', function(req, res) {
  models.Enclos.create({
    nom: req.body.nom,
    taille: req.body.taille,
    nb_singes: req.body.nb_singes,
    capacite_max: req.body.capacite_max,
    description: req.body.description
  })
    .then(() => {
      res.render('enclosajoute')
    })

})

//récuperer un seul enclos
app.get('/pageenclos/:id', function(req, res){
  models.Enclos.findOne({
    where: {
    id: req.params.id
    }
  })
    .then((enclos) => {
      res.render('pageenclos', {desenclos: enclos})
    })
})

//modification d'un enclos
app.get('/modifierenclos/:id', function(req, res) {
	res.render(('modifenclos'), { id:req.params.id})
})

app.post('/enclos/update/:id', function(req, res){
  models.Enclos.update(
    req.body,
    {
		where: {
        id: req.params.id
        }
    }, {nom: req.body.nom, taille: req.body.taille, nb_singes: req.body.nb_singes, capacite_max: req.body.capacite_max, description: req.body.description})
    .then(() => {
     res.render('modifenclosfait')
    })
	.catch((err) =>{
		res.json(err)
	})
})


//supprimer un enclos
app.post('/enclos/nom', function(req, res) {
  models.Enclos.destroy({
    where: {
      nom: req.body.nom
    }
  })
  .then(() => {
    res.redirect('/enclos');
  })
})


// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   * 
   * Listen only when database connection is sucessfull
   */
app.listen(process.env.PORT, function() {
    console.log('Express server listening on port' + process.env.PORT);
  });
});