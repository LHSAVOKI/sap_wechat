var jsSHA = require('jssha');
function validateWXToken(rep,res){
  var token="wechat2c4c";
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

  var shaObj = new jsSHA(original, 'TEXT');
  var scyptoString=shaObj.getHash('SHA-1', 'HEX');

  if (signature == scyptoString) {
    res.send(echostr);
  }else {
    res.send('bad token');
  }

}

module.exports = validateWXToken;
