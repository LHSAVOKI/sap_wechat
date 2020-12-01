var reply = require('../jerryapp/service/handleReplyFromC4C.js');

var content = "content=%7b%22original_id%22%3a%221003%22%2c%22sma_id%22%3a%2259163%22%2c%22service_req_no%22%3a%221034190%22%2c%22author_name%22%3a%22Jerry%20Wang%22%2c%22author_email%22%3a%22%22%2c%22sma_create_datetime%22%3a%222017-12-28T03%3a44%3a22Z%22%2c%22private_ind%22%3a%22FALSE%22%2c%22text%22%3a%22aad%22%7d";
reply(content);