const axios = require('axios');
const config = require("./mcConfig.js"); 
var url = config.proxy + "testtt";
    
axios.get(url).then(function (response) {
        console.log("response in Lambda:" + response.data);
});
