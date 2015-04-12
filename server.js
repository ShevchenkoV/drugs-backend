
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Drugs     = require('./app/models/drugs');

mongoose.connect(process.env.mongo||''); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  console.log(req.url);
 res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/drugs')
  .get(function(req, res) {
    Drugs.find(function(err, drugs) {
      if (err){
        res.send(err);
      }
      res.json(drugs);
    });
  });

router.route('/find')

.get(function(req, res) {
  if(req.query.name){
    Drugs
    .find({name:{ "$regex":req.query.name, "$options": "ig" }})
    .limit(20)
    .exec(response);
  }
  else{
    if(req.query.ats){
      Drugs
      .find({ats:{ "$regex":req.query.ats, "$options": "ig" }})
      .limit(20)
      .exec(response);
    }
  }

  function response (err, drugs) {
    if (err) {
      res.send(err);
    }
    res.json(drugs);
  }
  });


router.route('/drugs/:drug_id')

  .get(function(req, res) {
    Drugs.findById(req.params.drug_id, function(err, drug) {
      if (err){
        res.send(err);
      }
      res.json(drug);
    });
  })

  .put(function(req, res) {

    Drugs.findById(req.params.drug_id, function(err, drug) {
      if (err){
        res.send(err);
      }
      drug.name = req.body.name;  // update name

      // save the drug
      drug.save(function(err) {
        if (err){
          res.send(err);
        }
        res.json({ message: 'object updated' });
      });
    });
  });

app.use('/api', router);


app.listen(port);
console.log('listening port:' + port);
