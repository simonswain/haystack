var straw = require('straw')

/*
 * outputs whatever is received.
 */

module.exports = straw.node.extend({
  title: 'Passthru'
});
