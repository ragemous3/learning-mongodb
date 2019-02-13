////////////////QUERIES WITH MONGOOSE///////////////////
  const {ObjectID} = require('mongodb');
  const {mongoose} = require('./../server/db/mongoose');
  const {Todo} = require('./../server/models/todo');
  const {User} = require('./../server/models/user')
  var id = '5c6167f75bdb76026c0b18ae';

  /*
    ./../ <--- upp en directory
    För att sortera ut specifika adresser
    när man gör en find så passerar man in
    ett objekt med ett parameternamn/property.
    mongoose sorterar efter den parametern/propertien
    .find() returnerar alltid en Promise (men du behöver konverta mongoose.Promise till global.Promise)

    * ANVÄND FIND() om du vill hitta flera saker efter ett kriterium
    * Använd findOne() om du vill hitta en sak efter ett kriterium
    *använd alltid findById(id) om du vill hitta något efter ID!

  */
  if(!ObjectID.isValid(id)){
    console.log('ID is not valid...')
  }else{
    // Todo.find({ //returnerar en array efter resolven och hämtar alla som matchar kriteriet som är medskickat.
    //   _id: id
    // }).then((specificTodo) => { //här resolvar en promise :o
    //
    //   console.log(specificTodo)
    // }, (err) => {
    //   console.log(err);
    // });
    //
    // Todo.findOne({ //returnerar ett OBJ. Mycket bättre än bara find();
    //   _id:id
    // }).then((res) => {
    //   console.log(res);
    // }, (err) => {
    //   console.log(err);
    // })
    //
    // Todo.findById(id).then((todo) => { //holy shit. Mongoose är the shit.
    //   if(!todo){console.log('Id not found..')}
    //   else{console.log(`Results you got by finding by id ${todo}`) }
    // }).catch((e) => console.log('Id seems to be invalid ' + e))
    User.findById(id).then((user) => {
      if(!user){
        console.log('Something went wrong!')
      }
      console.log(`Hey! Your found! ${user}`)
    }).catch((e) => {
      console.log(`Something went so awfully wrong ${e}`)
    });

}
