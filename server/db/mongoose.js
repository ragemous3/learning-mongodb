const mongoose = require('mongoose');
mongoose.Promise = global.Promise;//Man skriver över mongoose egna Promise-model eftersom att promise
//finns inbyggd.
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports = {mongoose};
