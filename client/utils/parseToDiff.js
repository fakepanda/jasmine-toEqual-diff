/**
 * 
 * example:
 * "Expected [ Object({ id: 'test', content: Object({ subId: 1, title: null, params: Object({ 4: Object({ name: 'Jon'}), numArray: [4, 8, 15, 16, 23, 42], ref: Object({ errors: <circular reference: Object> }) }) }) })] to equal [ Object({ id: 'ss', content: Object({ subId: 1, title: null, params: Object({ 4: Object({ name: 'John'}), numArray: [4, 8, 15, 16, 23, 42], ref: Object({ errors: <jasmine.any(Object)> }) }) }) })]"
 *
 * @param {String} input Original string to parse, "Expected Object({...}) to equal Object({...})"
 * @param {String} [trimHead] optional
 * @param {String} [splitOnText] optional
 * @return {Array} an array with 2 entries for the string to diff
 */
const parser = (input, trimHead, splitOnText) => {
  // remove the beginning 'Expected'
  const reg = new RegExp('^' + (trimHead || 'Expected'));
  let text = input.trim().replace(reg, '');
  // need to parse things like <circular reference> and <jasmine.any(Object)>
  // this isn't error-proof, but good enough until someone complains
  text = text.replace(/<(.*?)>/g, `\"<$1>\"`);
  text = text.trim();

  // won't work if text contains the string 'to equal' multiple times
  return text
    .split(splitOnText || 'to equal')
    .map(str => JSON.stringify(eval(str.trim()), null, 2));
};

export default parser;
