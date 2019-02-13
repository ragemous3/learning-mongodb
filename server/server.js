  const mongoose = require('mongoose');

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/TodoApp');

  var Todo = mongoose.model('Todo',{

    text:{
      type: String
    },
    completed:{
      type:Boolean
    },
    completedAt:{
      type:Number
    }

  });

  var newTodo = new Todo({
    text:'cook dinner'
  });
  //newTodo.save(); sparar skiten ner på db:en.
  newTodo.save().then((doc ) => {
    console.log(`saved todo ${doc}`);
  }, (err) => {
    console.log(`Unable to save Todo ${err}`)
  });
