/* Scraper: Server #3  (18.2.1) 
 * ========================= */

// Dependencies:
var request = require('request'); // Snatches html from urls
var cheerio = require('cheerio'); // Scrapes our html
var express = require('express');
var mongojs = require('mongojs');
var app = express();
var objR = express.Router();
var bodyParser = require('body-parser');

app.use(express.static('public'));
var mongoose = require('./mongoo.js');

var db = mongojs('jobsDb', ['Jobs']);

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
     next();
});



// first, tell the console what server3.js is doing
console.log("\n******************************************\n" +
            "Look at the image of every award winner in \n" +
            "one of the pages of awwwards.com. Then,\n" +
            "grab the image's source url." +
            "\n******************************************\n")


// run request to grab the html from awwards's clean website section
request("http://www.indeed.com/jobs?q=web+developer&l=somerset&start=20", function (error, response, html) {
  
  // load the html into cheerio
  var $ = cheerio.load(html);


  // make an empty array for saving our scraped info
  var result = [];

  // with cheerio, look at each award-winning site, 
  // enclosed in "figure" tags with the class name "site"
  var joburl = "";

for(i=1; i<=10;i++)
{
  tc = "#sja" +i;
  $(tc).each(function(i, element){
      

      /* Cheerio's find method will "find" the first matching child element in a parent.
       *    We start at the current element, then "find" its first child a-tag.
       *    Then, we "find" the lone child img-tag in that a-tag. 
       *    Then, .attr grabs the imgs src value.
       * So: <figure>  ->  <a>  ->  <img src="link">  ->  "link"  */
      var imgLink = $(element).attr("href");

      // push the image's url (saved to the imgLink var) into the result array
      joburl = "indeed.com" + imgLink;
      result.push({"Link": joburl});
     // db.yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" }
      db.Jobs.insert({descr: joburl});


  });
};
  // with each link scraped, log the result to the console
  console.log(result);
 
});
objR.get('/joblist', function(req, res) {
    var ljob = mongoose.model('Jobs');
    db.Jobs.find({},{},function(e,docs){
        res.json(docs);
    });
});

objR.get('/', function(req, res) {

    res.send('./index.html');
    var el = document.getElementById("njobs");
console.log('found el: ' +el);
var cursor = Jobs.find({ descr }).cursor();
cursor.on('data', function(doc) {
  textnode = '<p>' + doc + '</p';
  el.appendChild(textnode); 

});
cursor.on('close', function() {
  // Called when done
}); //

});

/* GET Userlist page. */


app.use("/", objR);
app.use("/joblist", objR);
app.listen(3000, function() {
  console.log('App running on port 3000!');
});
