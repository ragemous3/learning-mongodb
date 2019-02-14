////////////////REMOVE WITH MONGOOSE///////////////////
  const {ObjectID} = require('mongodb');
  const {mongoose} = require('./../server/db/mongoose');
  const {Todo} = require('./../server/models/todo');
  const {User} = require('./../server/models/user')
  var id = '5c6167f75bdb76026c0b18ae';

   /* Mongoose ger 3 metoder för att ta bort dokument
    * Det funkar som så att man passer in en fråga i ett objekt med
    * en property som säger till mongoose vilken eller vilka doks
    * som skall tas bort. Vill man ta bort allt med en remove-teknik
    * så måste man passera in ett tomt objekt i remove-metoden.
    * 1. är modelNamn.remove({((deprecated)) }) och tar bort fler än ett dokument
    * 2.
    *  Use deleteOne, deleteMany, or bulkWrite
   */



   // Todo.remove({}).then((results) => { //DEPRECATION WARNING USE deleMany instead
   //   console.log(results)
   // })
   // .catch((err) => {
   //   console.log(err)
   // });
   // Todo.deleteMany({
   // //FUNGERAR UTAN DEPRECATION VID MÅNGA
   // }).then((res) => {
   //   console.log(res);
   // }).catch((e) => console.log(err));


   //todo.findById funger men
   // ger deppen: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.

  // Todo.findOneAndDelete({ //Man kan även skriva den som en string.
  //   //fungerar utan deprecation warning
  //   _id:'5c6552254c5fc126141cdb22'
  // }).then((res) => {
  //   console.log(res);
  // }).catch((e) => console.log(err));
