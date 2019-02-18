  require('./config/config');
  const {ObjectID} = require('mongodb');
  var {mongoose} = require('./db/mongoose.js')//./ <-- i samma mapp.
  var {Todo} = require('./models/todo.js')//./ <-- i samma mapp.
  var {User} = require('./models/user.js')//./ <-- i samma mapp.
  var express = require('express');
  var bodyParser = require('body-parser');
  var {authenticate} = require('./middleware/authenticate')
  var bcrypt = require('bcryptjs');
  var app = express();
  var port = process.env.PORT;

  /*
  BUGGAR!
    Det finns några buggar.... ? Det är dålig error-handling i någon av
    routesen.
  BUGGAR?
  /users/login lagrar dubbla nyklar på mongodb.

  */
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
  //förstår inte riktigt /todos:id ?
  app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
      res.status(404).send();
      console.log('id not found');
      return;
    }
    Todo.findOneAndDelete(id).then((doc) => {
      if(!doc){
        res.status(404).send();
        return;
      }
      res.status(200).send({doc});
      return;
    }).catch((e) => {
      //400 bad request
      res.status(400).send(e);
    })
  })
  app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = {text: req.body.text, completed: req.body.completed};
    //I bodyN av request är var någonstans som uppdateringen kommer att lagras.
      if(!ObjectID.isValid(id)){
        res.status(404).send();
        return;
      }
      if(typeof body.completed === "boolean"){
        body.completedAt = new Date().getTime();
        }else{
          body.completed = false;
          body.completedAt = null;
        }
        //$set (ändra något)//new:true säger till db att skicka tillbaka det som ska uppdateras
          Todo.findByIdAndUpdate(id, {$set: body},{new:true})
          .then((doc) => {
            if(!doc){
              res.status(404).send();
            }
            res.status(200).send({doc});
          }).catch((err) => {
            res.status(400).send(err)
          });
      })

  app.post('/users', (req,res) => {

      if(!req.body.password || !req.body.email){
        req.status(400).send(`Your email or password is not typed in correctly`);
        return;
      }
      var body = {
        email: req.body.email,
        password: req.body.password
       }
      var test = User.findOne({
        email: body.email
      })

      if(test !== null){
        var user = new User(body);
        user.save().then(() => {
          return user.generateAuthToken();
        }).then((token) => {
          /*
            Man skickar user för att user innehåller värdefull information
            som man kan använda på sidan.
            för att sätta en custom header så prefixar man the key med x-auth.
            */
              res.header('x-auth', token).send(user.toJSON());
          }).catch((err) => {
           res.status(400).send(err);
            });
      }else{
        res.status(400).send('You do already have an account here!')
      }
    });

    app.get('/users/me', authenticate, (req, res) => {
      res.send(req.user);
    })

    app.post('/users/login', (req,res) => {
      var loginInfo = {email: req.body.email, pw: req.body.password};
      User.findTokenOnLogin(loginInfo).then((user) => {
        //eftersom att man kallar på skiten genom modellen
        //"User" så kommer denna callback bli en instans av User.
        return user.generateAuthToken().then((token) => {
          res.header('x-auth', token).send(user);
        });
      }).catch((err) => {
          res.status(400).send(`Wrong user or password ${err}`);
      })
    })

    app.delete('/users/me/token', authenticate, (req,res) => {
      req.user.removeToken(req.token).then((res) => {
        console.log(res);
        res.status(200).send();
      }).catch((err) => {
        res.status(401).send();
    })
    })
  app.listen(port, () => {
    console.log('Server up on port 3000')
  })
