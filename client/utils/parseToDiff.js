/**
 * 
 * @param {String} input Original string to parse, "Expected Object({...}) to equal Object({...})"
 * @param {String} [trimHead] optional
 * @param {String} [splitOnText] optional
 * @return {Array} an array with 2 entries for the string to diff
 */
const parser = (input, trimHead, splitOnText) => {
  const reg = new RegExp('^' + (trimHead || 'Expected'));
  let text = input.trim().replace(reg, '');
  text = text.trim();

  // won't work if text contains the string 'to equal' multiple times
  return text
    .split(splitOnText || 'to equal')
    .map(str => JSON.stringify(eval(str.trim()), null, 2));
};

export default parser;
