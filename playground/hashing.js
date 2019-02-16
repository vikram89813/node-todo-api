const bcrypt = require('bcryptjs');

// const {SHA256} = require('crypto-js');
// const jwt = require('jsonwebtoken');

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');

// console.log(decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`hash: ${hash}`);

// var data ={
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash) {
//     console.log('Not Changed!');
// } else {
//     console.log('Data Changed!');
// }

var password = '123abc!';

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     });
// });

var h_p = '$2a$10$AadAHS4MfqcV6L1KgP1q..gxWN.gbAboUVP73vqgQ3Ro02/yaEQL6';
bcrypt.compare(password,h_p,(err,res)=>{
    console.log(res);
});