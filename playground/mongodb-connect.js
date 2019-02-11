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
  // db.collection('todos').insertOne({something:'kul', completed: false}, (err,results) => {
  //
  //   if(err){
  //     return console.log(`something went wrong with insertion of data! \n Error in question: ${err}`)
  //   }
  //   console.log(JSON.stringify(results.ops, undefined, 2))
  // });
    db.collection('Users').insertOne({
      name:'Rasmus',
      age: '26',
      country:'Sweden',
      municipality:'bandhagen',
      postal:'12464',
      phone:'0722724229'
    }, (err,results) => {
      if(err){
        return console.log(`Errrr ${err}`);
      }
      //console.log(JSON.stringify(results.ops,undefined,2))
      console.log(results.ops[0]._id.getTimestamp())
      //node mongodb-connect.js
    });
  client.close();
});

/*
result.ops är


*/
