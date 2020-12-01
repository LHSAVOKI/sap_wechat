var express = require('express');

var app = express();

app.use('/', express.static(process.cwd()));

app.listen(3003, function () {
  console.log('Listening on port, process.cwd(): ' + process.cwd() );
});
