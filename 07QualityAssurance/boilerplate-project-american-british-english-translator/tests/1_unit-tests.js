const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    suite("Test American to English translation", function() {
        test("Test 1", function() {
            assert.equal(Translator.translate("1"), 1);
        });
        /*
        test("Test 2", function() {
            assert.equal(solver.validate("1"), true);
        });
        test("Test 3", function() {
            assert.equal(solver.validate("1").error, 'E');
        });
        test("Test 1", function() {
            assert.isTrue(solver.validate("1"), true);
        });
        test("Test 2", function() {
            assert.equal(solver.validate("1"), true);
        });
        test("Test 3", function() {
            assert.equal(solver.validate("1").error, 'E');
        });
        test("Test 3", function() {
            assert.equal(solver.validate("1").error, 'E');
        });
        */
      });
    /*
      suite("Test row placement", function() {
        test("Handles valid row placement", function() {
          const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
          const row = 0;
          const column = 1;
          const value = "3";
          assert.isTrue(solver.checkRowPlacement(puzzleString, row, column, value));
        });
        test("Handles invalid row placement", function() {
          const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
          const row = 0;
          const column = 1;
          const value = "1";
          assert.isFalse(solver.checkRowPlacement(puzzleString, row, column, value));
        });
      });
      */
});
