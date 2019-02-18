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
