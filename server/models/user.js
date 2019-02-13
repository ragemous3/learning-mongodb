  const mongoose = require('mongoose');
  var User = mongoose.model('User', {

    user: {
      type:String,
      required:true,
      trim:true
    },
    email:{
      type:String,
      required:true,
      trim:true,
      minglength:1
    }
  })
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
