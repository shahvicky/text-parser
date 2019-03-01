//The following functions are used to parse the text to the corresponding JSON format.

const parseGT = (val) => {
  return {
		"$gt" : val
	}
}

const parseGTE = (val) => {
  return {
		"$gte" : val
	};
}

const parseLT = (val) => {
  return {
    "$lt" : val
  }
}

const parseLTE = (val) => {
  return {
    "$lte" : val
  }
}

const parseEqual = (text) => {
  return {
    "$eq" : text
  }
}

/**
 * Restriction for this functin is that it gets only the numeric string
 * @param {String} length The numeric string
 */
const parseLen = (length) => {
  return {
    "$len" : Number(length)
  }
}

const parseQuote = (text) => {
  return {
    "$quoted" : text
  }
}

const parseNegation = (text) => {
  return {
    "$not" : text
  }
}


module.exports = {parseGT, parseGTE, parseLT, parseLTE, parseEqual, parseLen, parseQuote, parseNegation}