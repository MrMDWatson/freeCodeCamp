'use strict';

const SudokuSolver = require('../controllers/test.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let { puzzle, coordinate, value } = req.body;
      let row = coordinate.split("")[0];
      let column = coordinate.split("")[1];
      let check = solver.validate(puzzle);
      let checkRow = solver.checkRowPlacement(puzzle, row, column, value);
      let checkCol = solver.checkColPlacement(puzzle, row, column, value);
      let checkReg = solver.checkRegionPlacement(puzzle, row, column, value);
      let validInput = [checkRow, checkCol, checkReg].every((bool) => bool == true);
      res.json({valid: validInput});
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      console.log(req.body);
      const { puzzle } = req.body;
      let newPuzzle = solver.solve(puzzle);
      res.json({solution: newPuzzle});
    });
};
