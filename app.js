var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var validify = require('./validify.js');
var models = require('./models.js');
var port = process.env.PORT || 3000;

// setting the promise and connecting to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Urls')

// serving from public dicrecory
app.use(express.static(path.join(__dirname, 'public')));

//
app.get('/new/*', function(req, res) {
  var longUrl = req.params[0];

  // if url is entered in complete format
  if (validify.ValidURL(longUrl)) {

    //set a random number to the id and the shortUrl
    var shortUrl = Math.floor(Math.random() * 10000000).toString();
    var data = new models({original: longUrl, shortened: shortUrl, _id: shortUrl});
    console.log("long: " + longUrl);
    console.log("short: " + shortUrl);
    console.log("data: " + data);

    //save to database
    data.save(function(err) {
      if (err) {
        return res.send();
      }
    });
    res.json(data);
    // if url is not valid
  } else {
    res.json({error: "a complete URL format not found"});
  }

});

//when shortened url is entered
app.get('/:shortenedUrl', function(req, res) {

  // find the shortended url in database
  var shortenedUrl = req.params.shortenedUrl;
  models.findOne({
    "_id": shortenedUrl
  }, (err, data) => {
    if (err) {
      return res.send();
    }

    // redirect to the original database
    res.redirect(301, data.original)
  });
});

// Listen for requests
app.listen(port, function() {
  console.log('listening on port ' + port);
});
