  const {ObjectID} = require('mongodb');
  var {mongoose} = require('./db/mongoose.js')//./ <-- i samma mapp.
  var {Todo} = require('./models/todo.js')//./ <-- i samma mapp.
  var {User} = require('./models/user.js')//./ <-- i samma mapp.
  var express = require('express');
  var bodyParser = require('body-parser');

  var app = express();
  var port = process.env.PORT || 3000;
  //Man använder bodyparser för att plocka ut key=values ur URLEN.
  app.use(bodyParser.json(), (req,res,next) => {
    console.log('Master! Someone is connecting directly to this server!')
    next();
  })
  app.get('/', () => {

    console.log('Someone is connecting 2!')

  })
  app.post('/todos', (req,res) => {
    console.log(req.body)
    var todo = new Todo({
      text: req.body.text
    });
    todo.save().then((doc) => {
      console.log(doc);
      res.send(doc); // skicka det som postades till servern tillbaka till användaren.
    }, (er) => {
      console.log(er);
      //res.status(400) om bad request.
      res.status(400).send(er);
    });
  });
  app.get('/todos', (req,res) => {
    Todo.find().then((docs) => {
      console.log(docs)
      res.send({
        todos: docs
      });
    }, (err) => {
      console.log(err);
      res.status(400).send(err);
    });
  });
  app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
      if(!ObjectID.isValid(id)){
        console.log('Wrong id sent to server');
        res.status(404).send();
        return;
      }
      Todo.findById(id).then((doc) => {
        if(!doc){
          res.status(404).send();
          return;
        }
      res.send({doc});
    }).catch(err => {
      console.log(err)
      //400 - bad request.
      res.status(400).send();
    })
  });
  app.listen(port, () => {
    console.log('Server up on port 3000')
  })
/*
app.use konfiguerar middleware

*/
