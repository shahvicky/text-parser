'use strict';
/**
 * These are helper functions that are scoped globally
 * so we can also use them anywhere in our app without 
 * requiring them. The “to” function helps with handling 
 * promises and errors. It is a super helpful function. 
 * The ReE and ReS functions help the controllers send 
 * responses in a unified way.
 */
const pe = require('parse-error'); //parses error so you can read error message and handle them accordingly

const to = (promise) => {
  return promise
  .then(data => {
    return [null, data];
  }).catch(err => 
    [pe(err)]
  );
}

const TE = (err_msg, log) => {
  if(log){
    console.error(err_msg);
  }
  throw new Error(err_msg);
}

const ReE = (res, err, code) => {
  if(typeof err == 'object' && typeof err.message != 'undefined'){
    err = err.message;
  }
  if(typeof code !== 'undefined') res.statusCode = code;
  return res.json({success:false, error: err});
}

const ReS = (res, data, code) => {
  let send_data = {success:true};
  if(typeof data == 'object'){
    send_data = Object.assign(data, send_data);//merge the objects
  }
  if(typeof code !== 'undefined') res.statusCode = code;
  return res.json(send_data)
}

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});

module.exports = {to, TE, ReE, ReS};