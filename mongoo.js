/* Mongoose Example (Students) (18.3.03)
 * ===================================== */ 

// dependency
var mongoose = require('mongoose');

// create the Schema class
var Schema = mongoose.Schema;

// instantiate a userSchema object with the Schema class we just made
var JobsSchema = new Schema({

     descr:  String,
     date: { type: Date, default: Date.now },
   });

// create the "User" model with our UserSchema schema
var Jobs = mongoose.model('Jobs', JobsSchema);

// export the User model, so it can be used in server.js with a require.
module.exports = Jobs;
