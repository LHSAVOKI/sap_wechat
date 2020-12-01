/*var redis = require("redis"),
    client = redis.createClient("redis://h:p99a8dd0d92871b9ffe7a026e6d70beecd7f2a0e743fa1e2840a58ce048f41c4a@ec2-34-237-158-248.compute-1.amazonaws.com:9479"); // by default localhost will be used!!

client.on("error", function (err) {
    console.log("Redis failed! Error " + err);
});

client.set("some key", "i042416");

client.lpush('list', 'key_0');
client.lpush('list', 'key_1');

// 下标(index)参数 start 和 stop 都以 0 为底，也就是说，以 0 表示列表的第一个元素，以 1 表示列表的第二个元素，以此类推。
// 你也可以使用负数下标，以 -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此类推。
client.lrange('list', '0', '-1', function(error, res){
            if(error) {
                console.log(error);
            } else {
                console.log("res:" + res);
            }
});

client.llen('list', function(error, count){
	console.log("total size: " + count);
});

client.get("some key", function(err, reply) {
    // reply is null when the key is missing
    console.log("Jerry Redis practice: ******************** " + reply);
});


client.del('list', function(error, count){
    if(error){
        console.log("error when del:" + error);
    }
    console.log("del ok, reply: " + count); // Jerry: this is actually reply: OK
    client.end(true);
});
*/

var client = require("../jerryapp/service/redisClient.js");


client.getList("gh_106591ffb8a3").then(function(content){
    console.log("Jerry content: " + content);
});





