var diff = require('diff');

const diffTwoStrings = (one, two) => {
  return diff.createPatch('input', one, two);
};

export default diffTwoStrings;
