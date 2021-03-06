'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.credentials = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  basicTask: function(test) {
    test.expect(2);
    test.ok(true,"should not fail if task has no credentials")

    var actual = grunt.config("options.basicTest");
    var expected = {
      "my-cred1":"foo",
      "my-cred2":"bar"
    }
    test.deepEqual(actual, expected, 'should set grunt options.credentials to valid credentials');

    test.done();
  },
  mapExpand: function(test) {
    test.expect(1);

    var actual = grunt.config("options.complexMappingTest");
    var expected = {
      "my-cred1":"foo",
      "my-cred2":"bar"
    }
    test.deepEqual(actual, expected, 'should expand mapping below specified credential path');

    test.done();
  }
};
