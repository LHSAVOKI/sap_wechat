var express = require('express');
var routesEngine = require('./jerryapp/routes/index.js'); // index.js actually
    // X, X.js, X.json and X.node see blog http://www.ruanyifeng.com/blog/2015/05/require.html
    
var app = express();

app.use('/ui5', express.static(process.cwd() + '/webapp'));
app.use('/v', express.static(process.cwd() + '/vue'));
app.use('/map', express.static(process.cwd() + '/map'));
app.use('/tile', express.static(process.cwd() + '/tileStudy'));
app.use('/com', express.static(process.cwd() + '/uicomponent'));
app.use("/ui5h", express.static(process.cwd() + '/zcamera/webapp'));
app.use("/demo", express.static(process.cwd() + '/demo'));
routesEngine(app);

console.log("process.env.PORT: " + process.env.PORT);

var port = process.env.PORT || 80;

app.listen(port, function () {
  console.log("Listening on port: " + port );
});
var request = require('request');
var jsSHA = require('jssha');

module.exports = function (app) {
  app.route('/').get(function(req,res){
    var token="jerry"; // replace it with your own token
    var signature = req.query.signature,
      timestamp = req.query.timestamp,
      echostr   = req.query.echostr,
      nonce     = req.query.nonce;
      oriArray = new Array();
      oriArray[0] = nonce;
      oriArray[1] = timestamp;
      oriArray[2] = token;
      oriArray.sort();
      var original = oriArray.join('');

      var shaObj = new jsSHA("SHA-1", 'TEXT');
      shaObj.update(original);
      var scyptoString = shaObj.getHash('HEX');
      console.log("calculated string: " + scyptoString);
     if (signature == scyptoString) {
        res.send(echostr);
     } else {
        res.send('bad token');
     }
  });
};
   