const content_pattern = /<!\[CDATA\[(.*)\]\]>/;

module.exports = function(raw){
	var body = content_pattern.exec(raw);
    if( body.length === 2){
        return body[1];
	} 
	return null;
};
