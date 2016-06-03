var assert = require('assert')
var _ = require('lodash')
var fs = require('fs')

var subject = require('./index')

module.exports = function () {
  var source = fs.readFileSync('test/fixtures/basic.js').toString()

  _.each({
    1: [],
    2: [],
    3: ['a'],
    4: ['a'],
    5: ['a'],
    6: ['z', 'b'],
    7: ['z', 'b'],
    8: ['z', 'b'],
    9: ['c'],
    10: [],
    11: [],
    12: ['d'],
    13: ['d'],
    14: ['d'],
    15: [],
    16: ['e'],
    17: ['e'],
    18: ['e'],
    19: [],
    20: [], // Would be cool if this worked, but I can't imagine how: ['e', 'f'],
    21: [],
    22: ['h', 'g'],
    23: ['h', 'g'],
    24: ['h', 'g'],
    25: [],
    26: ['i'],
    27: ['i'],
    28: ['i'],
    29: [],
    30: ['j'],
    31: ['k', 'j'],
    32: ['k', 'j'],
    33: ['k', 'j'],
    34: ['j'],
    35: [],
    36: [],
    37: ['m', 'l']
  }, function (expected, lineNumber) {
    var result = subject(source, parseInt(lineNumber, 10))

    try {
      assert.deepEqual(result, expected)
    } catch (e) {
      console.error('Assertion for line ' + lineNumber + ' failed!')
      throw e
    }
  })
}
