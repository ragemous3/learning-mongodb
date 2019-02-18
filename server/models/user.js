  const mongoose = require('mongoose');
  const validator = require('validator');
  const jwt = require('jsonwebtoken')
  const bcrypt = require('bcryptjs');
  var userSchema = new mongoose.Schema({
    email:{
      type:String,
      required:true,
      trim:true,
      minlength:1,
      unique:true,
      validate:{
        validator: validator.isEmail,
        message:'${VALUE} is not a valid email-adress'
      }
    },
      password: {
        type:String,
        require:true,
        minlength:6
      },
      tokens: [{
        access: {
          type:String,
          require:true
        },
        token: {
          type: String,
          require:true
        }
      }]
  })
  //methods är ett "objekt"

  userSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    try{
      decoded = jwt.verify(token, 'abc123');
    }catch{
      console.log('Token has been manipulated!');
      return new Promise((resolve,reject) => {
        reject();
      })
      //return Promise.reject();
    }
    return User.findOne({
      '_id': decoded._id,
      'tokens.access':'auth',
      'tokens.token':token
    })
  };


  //change original mongoose toJSON-method to only return certain values.
  userSchema.methods.toJSON = function (){
    var user = this;
    var userObj = user.toObject();

    return {_id: userObj._id, email: userObj.email};

  };

  userSchema.methods.generateAuthToken = function(data){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({access, token});
    //user.token = user.tokens.concat([{access,token}]);
    return user.save().then(() => {
      return token;
    }); //applicerar förändringar till databasen.
  };

  userSchema.pre('save', function(next) {
    var user = this;
    let pw = user.password;
    if(user.isModified('password')){
      bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(user.password, salt, function(err, hash){
          user.password = hash;
          next();
        })
      }, (err) => {
        console.log('unable to salt pw!')
      })
    } else{
      next();
    }
  })
  userSchema.statics.findTokenOnLogin = function(loginInfo){
    var User = this;
    return User.findOne({
      'email': loginInfo.email
    }).then((user) => {
        if(!user){
          return Promise.reject();
        }
        //returnerar en promise för bättre chain brah.
        /*
          Skriver du reject kommer en chain någonstans att faila och gå till catch. Skriver
          du resolve kommer den köra nästa "then". I alla chains är resolve, eller reject
          sista biten man ska göra. Därför kan det vara aktuellt att returnera nya promises.
        */
        return new Promise((resolve,reject) => {
          bcrypt.compare(loginInfo.pw, user.password, (err, res) => {
                if(res){
                  resolve(user);
                }else{
                  reject();
                }
            });
        });

    });
  };

  userSchema.methods.removeToken = function(token){
    var user = this;
     //$pull awesome mongoose-metod för att ta bort skit från DB!!!
    return user.updateOne({
       $pull: {
         tokens: {token}
       }
     }).then((res) => {
       resolve(res);
     }).catch((err) => {
       reject()
     })
  }

  var User = mongoose.model('User', userSchema);



  module.exports = {User};


  // var newUser = new User({
  //   user:'ragemous3',
  //   email: 'rasmus.john.moberg@gmail.com'
  // })
  //
  // newUser.save().then((succ) => {
  //   console.log('managed to save that shite ' + succ)
  // }, (err) => {
  //   console.log(`erroR ${err}`)
  // })
