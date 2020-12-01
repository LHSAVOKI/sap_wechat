var heroku = "redis://h:p99a8dd0d92871b9ffe7a026e6d70beecd7f2a0e743fa1e2840a58ce048f41c4a@ec2-34-237-158-248.compute-1.amazonaws.com:9479";

var scp = "redis://i042416:IF5X3bKPRt7Mu4Lk@10.11.241.43:50431";
var redis = require("redis"),
	client = redis.createClient(scp); // by default localhost will be used!!

console.log("Redis connection to SCP server has been established.");

client.on("error", function (err) {
    console.log("Redis has meet with some trouble: " + err);
});

function insertIntoList(sOpenId, oElement){
	client.lpush(sOpenId, oElement);
}

function clearList(sOpenId){
	return new Promise(function(resolve,reject){
		client.del(sOpenId, function(error, count){
    		if(error){
        		console.log("error when clear list:" + error);
        		reject(error);
    		}
    		var reply = "list clear successfully";
    		console.log(reply);
    		resolve(reply); 
		});
	});
}

function getListContent(sOpenId){

	return new Promise(function(resolve,reject){
		client.lrange(sOpenId, 0, -1, function(err, reply) {
    		console.log("content for list: " + sOpenId + " **********: " + reply + "***");
    		var content = reply;
    		if( content == ""){
    			content = "no conversation log found.";
                console.log("reject content: " + content);
                reject(content);
    		}
            else {
    		  resolve(formatToWechat(content));
            }
		});
     });
}

function test(callback){
    client.set("string key", "string val", redis.print);
    client.hset("hash key", "hashtest 1", "some value", redis.print);
    client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
    client.hkeys("hash key", function (err, replies) {
        var replyForBrowser = "Hash entry size: " + replies.length;
        console.log(replies.length + " replies:");
        replies.forEach(function (reply, i) {
            console.log("    " + i + ": " + reply);
            replyForBrowser = replyForBrowser + "\n" + "index: " + i + " value: "
             + reply;
        });
        client.quit();
        callback(replyForBrowser);
    });
}

var oRedisClient = {
	insert: insertIntoList,
	clearList: clearList,
	getList: getListContent,
    test: test
};

module.exports = oRedisClient;