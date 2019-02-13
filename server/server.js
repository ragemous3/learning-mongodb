  var {mongoose} = require('./db/mongoose.js')//./ <-- i samma mapp.
  var {Todo} = require('./models/todo.js')//./ <-- i samma mapp.
  var {User} = require('./models/user.js')//./ <-- i samma mapp.
  var express = require('express');
  var bodyParser = require('body-parser');

  var app = express();

  app.use(bodyParser.json(), (req,res,next) => {
    console.log('Someone is connecting directly to this server!')
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
  })
  app.listen(3000, () => {
    console.log('Server up on port 3000')
  })
/*
app.use konfiguerar middleware

*/
