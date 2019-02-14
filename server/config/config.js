
  var env = process.env.NODE_ENV || "development";
  if(env === "development"){
    process.env.PORT = 3000;
    process.env.MONGO_URI = 'mongodb://localhost:27017/TodoApp';
  }
