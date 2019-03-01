const _ = require("lodash");
const encoders = require('../helpers/encoders');
const decoders = require('../helpers/decoders');
const parsers = require('../helpers/parsers');


// const textToJSON = (text) => {
//   	// Encode all parentheses to make it easier to parse them
//     text = encoders.encodeParenthesis(text);

// 	// For OR
// 	if (/ OR /.test(text)){
// 		var parsed = text.split(' OR ');
// 		return parseOr(parsed);
// 	}

// 	// For AND
// 	if (/ AND /.test(text)){
// 		var parsed = text.split(' AND ');
// 		return parseAnd(parsed);
// 	}

// 	// For single item
// 	var parsed = text.split(' ');
// 	if (parsed.length == 1) {
// 		// Check for parenthesis in single item and remove them
// 		if ( /\(/.test(text) ){
// 			var mar = parsed.match( /\((.*?)\)/g );
// 			parsed = mar[0]
// 		}
//     return parseWord(parsed[0]);
//   }

// 	// For spaces
// 	return parseAnd(parsed);
// }

const parseOr = (textList) => {
  return {
    "$or" : _.map(textList, parse)
  }
}

const parseAnd = (textList) => {
  return {
    "$and" : _.map(textList, parse)
  }
}


const parseWord = (text) => {
  
  if(text[0] == '"'){
    text = text.substring(1, text.lastIndexOf('"'));
    text = decoders.decodeQuote(text);
    return parsers.parseQuote(text);
  }

  if(text[0] == "!") {
    let str = parse(text.substring(1));
    return parsers.parseNegation(str);
  }

  if(text[0] == '<') {
    if(text[1] == '=') {
      return parsers.parseLTE(parse(text.substring(2)));
    } else {
      return parsers.parseLT(parse(text.substring(1)));
    }
  }

  if(text[0] == '>') {
    if(text[1] == '=') {
      return parsers.parseGTE(parse(text.substring(2)));
    } else {
      return parsers.parseGT(parse(text.substring(1)));
    }
  }
  if(text[0] == '=') {
    return parsers.parseEqual(parse(text.substring(1)));
  }

  if(/^len/.test(text)) {
    return parsers.parseLen(text.substring(4, text.lastIndexOf(')')))
  }

  if(/^true$/.test(text)) {
    return true;
  }

  if(/^false$/.test(text)) {
    return false;
  }

  return text;
}

/**
 * 
 * @param {String} text The text to parse to JSON
 * @returns parsed JSON
 */
function parse(text) {
	// Remove all encoding on parenthesis, (returns the same text if the parenthesis are not encoded)
	text = decoders.decodeParenthesis(text);

	// Encode the parenthesis for easy parsing and check for nested ones during recusrion
	text = encoders.encodeParenthesis(text);

	// Encode all quotes to make it easiaer to parse quotes
	text = encoders.encodeQuote(text);

	// If enclosed in parenthesis, restart process
	if (/^\(.*?\)$/.test(text) ) {
		return parse(text)
	}

	// For OR
	if (/ OR /.test(text)){
		var parsed = text.split(' OR ');
		return parseOr(parsed);
	}

	// For AND
	if (/ AND /.test(text)){
		var parsed = text.split(' AND ');
		return parseAnd(parsed);
	}

	// If single item
	var parsed = text.split(' ');
	if (parsed.length == 1) {
		return parseWord(parsed[0]);
	}

	// For spaces
	return parseAnd(parsed);

};

module.exports = {parse}