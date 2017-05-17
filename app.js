var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var validify = require('./validify.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/url')

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.post('/new/:OrigUrl(*)', function(req, res){
  var longUrl = req.params.OrigUrl;
  var shortUrl = ''; // the shortened URL we will return
  
  if(validify.ValidURL(longUrl)){
    res.json({ longUrl });
  }
  else{
    res.json({ error : "URL not found"});
  }

});



// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
