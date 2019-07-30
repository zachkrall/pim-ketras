const express = require('express');
const app = express();
const port = process.env.PORT || '8080';
const tf = require('@tensorflow/tfjs');
const fs = require('fs');

const { gen } = require('./ml/gen.js');

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/generate', function(request, response){

  gen().then(
    (result)=>{response.json({
      "lyrics": result.toString().replace(/\n/g,'<br/>')
    })}
  ).catch(
    (err)=>{response.json({
      "lyrics": "error: " + err
    })}
  )


});

const listener = app.listen(port, function() {
  console.log('Listening on port ' + listener.address().port);
});