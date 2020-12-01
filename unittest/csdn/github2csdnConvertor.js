
function github2csdn(oGithubMarkdownSource){
  var html = oGithubMarkdownSource.body;
  var rawItem = [];
  var imagePool = [];
  extractImage(html,rawItem, imagePool);
  var formatted = replaceImageTag(rawItem,imagePool);
  var path = "C:\\Users\\i042416\\Pictures\\csdn\\" + oGithubMarkdownSource.title + ".txt"; 
  writeToFile(path, addSignature(formatted));
}

function getNodeTobeReplaced(current, parent, newPicUrl ){
  return {
    "current": current,
    "parent": parent,
    "newPicUrl": newPicUrl
  };
}


var IMAGE_PATTERN = /^!\[(.*)\]\((.*)\).*$/;///^.*src="(.*).*/;
var IMAGE_NAME = /^clipboard(\d+)$/;

function SortedImage(index, url){
  this.index = index;
  this.url = url;
}

function sortByIndex(v1,v2){
    if(v1.index < v2.index ){
      return -1;
    }
    else if(v1.index > v2.index ){
      return 1;
    }
    else return 0;
}

// complete url means: ![clipboard3](https://user-images.githubusercontent.com/5669954/32415087-7b4d8a06-c26e-11e7-9122-c818d5f31586.png)
function getImageIndexAndComplateUrl(trimed){

  var result = IMAGE_PATTERN.exec(trimed);

  if(!result) // pattern fails to match
    return null;
  // result 0 : whole image markdown
  // result 1 : "clipboard1"
  if( result.length != 3){
    return null;
  }
  var imageName = IMAGE_NAME.exec(result[1]);
  if( imageName == null || imageName.length != 2) {
    console.error("corrupt image source for: " + result[1]);
    return null;
  }
  var index = parseInt(imageName[1]);
  return new SortedImage(index, result[2]);
}

function isImage(trimed){
  if ( trimed.indexOf("clipboard") > 0 && trimed.indexOf("![") === 0)
    return true;
  return false;
}


function extractImage(source,raw,imagePool){
  var splitted = source.split("\n");
  for( var i = 0; i < splitted.length; i++){
    var origin = splitted[i];
    var trimed = splitted[i].trim();
    if( isImage(trimed) ) { 
      var storedImage = getImageIndexAndComplateUrl(trimed);
      if( storedImage)
        imagePool.push(storedImage);
      else{
        alert("caution! Corrupt image tag!");
      }
    }
    // Jerry: for CSDN blog, the raw image markdown source should also be reserved
    raw.push(origin);
  }
  imagePool.sort(sortByIndex);
}

function replaceImageTag(raw,imagePool){
  var formatted = "";
  var line = "";
  for( var i = 0; i < raw.length; i++){
    if( !isImage(raw[i])) {
      line = raw[i];
    }
    else{
      line = imagePool.shift().url;
      line = "<img src=\"" + line + "\">";
    }
    formatted = formatted + "\n" + line;
  }
  return formatted;
}

function addSignature(raw){
  var jerry = "<img src=\"https://user-images.githubusercontent.com/5669954/61616089-2a87e180-ac9a-11e9-861d-c29c2cf897af.png\">";
  var result = raw + "要获取更多Jerry的原创文章，请关注公众号\"汪子熙\":";
  result = result + "\n" + jerry;

  console.log("Jerry converted source code: " + result);
  return result;
}

// <nul (set/p z=123456) | clip

/*
function putToClipboard(result){
   var command = "<nul (set/p z=" + result + ") | clip ";
   exec(command);
}*/

function writeToFile(path, result){
  fs.writeFileSync(path, result);
}

var exec = require("child_process").exec;
var fs = require("fs");
module.exports = github2csdn;