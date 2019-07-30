const express = require('express');
const app = express();
const port = process.env.PORT;
const tf = require('@tensorflow/tfjs');
const fs = require('fs');

const gen = require('./gen.js');

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/lyrics', function(request, response){
  
  response.json({
    "lyrics": gen().toString().replace(/\n/g,'<br/>')
  });

});

const listener = app.listen(port, function() {
  console.log('Listening on port ' + listener.address().port);
});