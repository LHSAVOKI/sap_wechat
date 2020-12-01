var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err){
  	console.log(err);
  	throw err;
  }
  console.log("Jerry DB connection established!");

  var dbo = db.db("admin");
  dbo.collection("person"). find({}).toArray(function(err, result) { 
        if (err) 
        	throw err;
        console.log(result);
        db.close();
    });


  var whereStr = {"name":"Jerry"};  
    dbo.collection("person").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log("Find Jerry?" + result.length);
        debugger;
        db.close();
    });
  db.close();
});
