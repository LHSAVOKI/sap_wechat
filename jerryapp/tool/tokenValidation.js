var jsSHA = require('jssha');

module.exports = function(req,res){
    var token="jerry";
    var signature = req.query.signature,
      timestamp = req.query.timestamp,
      echostr   = req.query.echostr,
      nonce     = req.query.nonce;

      console.log("signature: " + signature);
      console.log("timestamp: " + timestamp);
      console.log("echostr: " + echostr);
      oriArray = new Array();
      oriArray[0] = nonce;
      oriArray[1] = timestamp;
      oriArray[2] = token;
      oriArray.sort();
      var original = oriArray.join('');

      var shaObj = new jsSHA("SHA-1", 'TEXT');
      shaObj.update(original);
      var scyptoString = shaObj.getHash('HEX');
      console.log("calculated string by Validation tool: " + scyptoString);
     if (signature == scyptoString) {
        res.send(echostr);
     } else {
        res.send('bad token');
     }
};