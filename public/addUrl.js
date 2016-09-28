
var mongoose = require("mongoose");

Jobs = mongoose.model("Jobs");

var el = document.getElementById("ijobs");
console.log('found el: ' +el);

var cursor = Jobs.find({ descr }).cursor();
cursor.on('data', function(doc) {
  textnode = '<p>' + doc + '</p';
  el.appendChild(textnode); 

});
cursor.on('close', function() {
  // Called when done
});

  
  
    