  const mongoose = require('mongoose');

  var Todo = mongoose.model('Todo',{

    text:{
      type: String,
      required:true,
      minlength: 1,
      trim:true
    },
    completed:{
      type:Boolean,
      default:false // default false ge fältet ett default-värde av false.
    },
    completedAt:{
      type:Number,
      default: null
    }

  });
  module.exports = {Todo}
  // var newTodo = new Todo({
  //   text:'cook dinner'
  // });
  // //newTodo.save(); sparar skiten ner på db:en.
  // newTodo.save().then((doc ) => {
  //   console.log(`saved todo ${doc}`);
  // }, (err) => {
  //   console.log(`Unable to save Todo ${err}`)
  // });
  // module.exports =
