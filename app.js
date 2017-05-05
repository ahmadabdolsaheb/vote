//imports
var express = require('express');
var port = process.env.PORT || 3000;

//create instance of express
var app = module.exports = express();

//Get call to return json
app.get('/', function(req,res){
// respond a json with ip/language/and operating system
    res.json({ip: (req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress).split(",")[0],
     lang: req.headers['accept-language'].split(',')[0],
     soft: require('os').type()});
})

app.listen(port, function(){
   console.log("listening for port: " + port);
})
