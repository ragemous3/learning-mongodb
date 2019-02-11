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
  db.collection('todos').find({completed:false}).toArray().then((docs) => {
    console.log('TodosArray');
    console.log(JSON.stringify(docs,undefined, 2)) ;
  }, (err) => {
    console.log(`unable to connect ${err}`)
  })
  //db.close();
});

/*
result.ops är


*/
