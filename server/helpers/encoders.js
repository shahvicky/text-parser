/**
 * The function to encode the text which are between the quotes " "
 * @param {String} text The text to be encoded, e.g. "vivek shah"
 * @returns {String} The text after encoding. e.g. "vivek%20Shah"
 */
const encodeQuote = (text) => {
  if ( /"/.test(text) ){
		let mar = text.match( /"(.*?)"/g );
		for (let i = 0 ; i < mar.length ; i++)
	    	text = text.replace(mar[i],mar[i].split(" ").join("%20"));
	}
	return text;
}

/**
 * The function to encode the text which are between the parenthesis ( )
 * @param {String} text The text to be encoded, e.g. (vivek shah)
 * @returns {String} The encoded text, e.g. (vivek%30shah)
 */
const encodeParenthesis = (text) => {
  if ( /\(/.test(text) ){
		let mar = text.match( /\((.*?)\)/g );
		for (let i = 0 ; i < mar.length ; i++)
		  text = text.replace(mar[i],mar[i].split(" ").join("%30"));
	}
	return text;
}

module.exports = {encodeQuote, encodeParenthesis}