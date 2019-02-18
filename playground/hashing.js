const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
//one-way algorithm. Man får alltid samma hash tillbaka.
//salt?

var data = {
  id:1
}
const token = jwt.sign(data, 'abc123');
const decoded = jwt.verify(data, 'abc123');

// var message = 'iamuser3';
//
// let hash = SHA256(message).toString();
//
// // console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id:4
//
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data + 'something').toString()) //hashed value of the data
// }
//
// var testHash = SHA256(JSON.stringify(data + 'something').toString())
// if(testHash === token.hash){
//   console.log('User is not an asshole')
// }else{
//   console.log('User is an asshole')
// }


/*
  * Man kan använda JSON.stringify för att konvertera objekt till strings!.


*/
