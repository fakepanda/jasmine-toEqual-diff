var diff = require('diff');

var one = require('./one.json');
var two = require('./two.json');

one = JSON.stringify(one, null, 2);
two = JSON.stringify(two, null, 2);

diff.createPatch('file', one, two);
