const {MongoClient, ObjectID} = require('mongodb');
//{MongoClient, ObjectId} drar ut
let todoUrl = 'mongodb://localhost:27017/TodoApp';//sista efter slashen är själva DB:en..
// db.collection(kollektion) skapar kollektionen,
// { useNewUrlParser: true } <- viktigt för att unvdvika deprecationwarning.
var objId = new ObjectID();
console.log('here it is '+ objId);

MongoClient.connect(todoUrl, { useNewUrlParser: true }, (err, client) => {

  if(err){
    return console.log(`something went wrong! Unable to connect ma good sir. Message: ${err}`);
  }
  console.log('connected to Db');
  const db = client.db('TodoApp');
  // db.collection('Users').findOneAndDelete({_id: new ObjectID('5c5ad80c9d3a893644921a9e')}).then((succ) => {
  //   console.log(succ);
  // }) // fungerar
  //db.close();
});

/*
result.ops är


*/
