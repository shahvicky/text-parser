/**
 * The function to decode the text which are between the quotes " "
 * @param {String} text The text to be decoded, e.g. vivek%20shah
 * @returns {String} The text after decoding. e.g. vivek Shah
 */
const decodeQuote = (text) => {
	return text.split("%20").join(" ");
};

/**
 * The function to decode the text which are between the parenthesis ( )
 * @param {String} text The text to be decoded, e.g. vivek%30shah
 * @returns {String} The decoded text, e.g. vivek shah
 */
const decodeParenthesis = (text) => {
  if (/^\(.*?\)$/.test(text) ) {
		text = text.substring(1,text.length-1)
	}
	return text.split("%30").join(" ");
}

module.exports = {decodeQuote, decodeParenthesis}