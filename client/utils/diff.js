var diff = require('diff');

const diffTwoStrings = (one, two) => {
  return diff.createTwoFilesPatch('Actual', 'Exptected', one, two);
};

export default diffTwoStrings;
