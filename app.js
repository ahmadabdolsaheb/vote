var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var validify = require('./validify.js');
var models = require('./models.js');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Urls')
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/new/*', function(req, res) {
  var longUrl = req.params[0];
  // the shortened URL we will return



  if (validify.ValidURL(longUrl)) {
    var shortUrl = Math.floor(Math.random() * 10000000).toString();
    var data = new models({original: longUrl, shortened: shortUrl, _id: shortUrl});
    console.log("long: " + longUrl);
    console.log("short: " + shortUrl);
    console.log("data: " + data);

    data.save(function(err) {
      if (err) {
        return res.send();
      }
    });
    res.json(data);
  } else {
    res.json({error: "a complete URL format not found"});
  }

});

app.get('/:shortenedUrl', function(req, res) {
  var shortenedUrl = req.params.shortenedUrl;
  models.findOne({
    "_id": shortenedUrl
  }, (err, data) => {
    if (err) {
      return res.send();
    }
    res.redirect(301, data.original)
  });
});

// Listen for requests
app.listen(port, function() {
  console.log('Magic happens on port ' + port);
});
