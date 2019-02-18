const mongoose = require('mongoose');
mongoose.Promise = global.Promise;//Man skriver över mongoose egna Promise-model eftersom att promise
//finns inbyggd.
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

mongoose.connection.once('open', function() {
  console.log('Connection to the server went alrighty!')
});


module.exports = {mongoose};
