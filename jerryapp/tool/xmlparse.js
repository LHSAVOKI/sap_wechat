module.exports = function(node_name, xml){
    var tmp = xml.split("<"+node_name+">");
    if( tmp.length < 2)
    	return null;
    var _tmp = tmp[1].split("</"+node_name+">");
    return _tmp[0];
};
