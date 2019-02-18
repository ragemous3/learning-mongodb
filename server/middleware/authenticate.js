  var {User} = require('./../models/user')
  //användaren skickar något och den här snappar upp dess token
      var authenticate = function(req,res,next){
        var token = req.header('x-auth');
        User.findByToken(token).then((user) => {
          if(!user){
            res.send('Token is invalid');
          }
          // Ändrar requert-parametern i andra routes så att systemet effektivt privatiseras
          req.user = user;
          req.token = token;
          //**************
          res.send(user)
          next();
        }).catch((err) => {
          res.status(400).send(err);
        })

      }

module.exports = {authenticate};
