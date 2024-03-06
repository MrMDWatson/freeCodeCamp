class SudokuSolver {
  constructor() {
    this.rowLabels = "ABCDEFGHI".split("");
    this.rows = Array(9).fill(null).map((d, i) => {
      let row = [];
      for (let j = 0; j < 9; j++) {
        row.push(i + (j * 9));
      }
      return row;
    });
    this.columnLables = "123456789".split("");
    this.columns = Array(9).fill(null).map((d, i) => {
      let column = [];
      for (let j = 0; j < 9; j++) {
        column.push(j + (i * 9));
      }
      return column;
    });
    this.regionLabels = "123456789".split("");
    this.regions = Array(9).fill(null).map((d, i) => {
      let region = [];
      let level = Math.floor(i / 3);
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          region.push(k + (9 * j) + (3 * i) + (level * 18));
        }
      }
      return region;
    });
  }

  validate(puzzleString) {
    let values = puzzleString.split("");
    return values.length == 81;
  }

  checkPlacement(array) {
    let entries = [];
    let valid = true;
    array.forEach((entry) => {
      if (entries.indexOf(entry) >= 0 && entry != ".") {
        valid = false;
      } else {
        entries.push(entry);
      }
    });
    return valid;
  }

  checkTargetPlacement(puzzleString, row, column, value) {
    let newPuzzleArray = puzzleString.split("");
    let rowIndex = this.rowLabels.indexOf(row.toUpperCase());
    let columnIndex = this.columnLables.indexOf(column);
    let regionIndex;
    let targetIndex = columnIndex + (rowIndex * 9);
    this.regions.forEach((d, i) => {
      if (d.indexOf(targetIndex) > -1) {
        regionIndex = i;
      }
    });
    
    if (/[1-9]/i.test(puzzleString[targetIndex])) {
      return "occupied";
    }
    newPuzzleArray.splice(targetIndex, 1, value);
    return {
      newPuzzleArray: newPuzzleArray,
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      regionIndex: regionIndex,
      targetIndex: targetIndex
    }
  };

  checkRowPlacement(puzzleString, row, column, value) {
    let validInput = /[1-9]/.test(value);
    if (!validInput) {
      return "invalid value";
    }
    let testObj = this.checkTargetPlacement(puzzleString, row, column, value);
    console.log(testObj);
    if (testObj == "occupied") {
      return false;
    }
    let test = Array(9).fill(null).map((d, i) => testObj.newPuzzleArray[(this.rows[testObj.rowIndex][i])]);
    return this.checkPlacement(test);
  }

  checkColPlacement(puzzleString, row, column, value) {
    let validInput = /[1-9]/.test(value);
    if (!validInput) {
      return "invalid value";
    }
    let testObj = this.checkTargetPlacement(puzzleString, row, column, value);
    if (testObj == "occupied") {
      return false;
    }
    let test = Array(9).fill(null).map((d, i) => testObj.newPuzzleArray[(this.columns[testObj.columnIndex][i])]);
    return this.checkPlacement(test);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let validInput = /[1-9]/.test(value);
    if (!validInput) {
      return "invalid value";
    }
    let testObj = this.checkTargetPlacement(puzzleString, row, column, value);
    if (testObj == "occupied") {
      return false;
    }
    let test = Array(9).fill(null).map((d, i) => testObj.newPuzzleArray[(this.regions[testObj.regionIndex][i])]);
    return this.checkPlacement(test);
  }

  solve(puzzleString) {
    this.validate(puzzleString);
    let newPuzzleString = puzzleString.slice();
    let unsolved = true;
    
    while (unsolved) {
      let puzzleArray = newPuzzleString.split("");
      let possibleAnswers = puzzleArray.map((d) => {
        if (d != ".") {
          return d;
        } else {
          return "123456789".split("");
        }
      });
      let newAnswers = possibleAnswers.map((s, i) => {
        if (!Array.isArray(s) || /[1-9]/.test(s)) {
          return s;
        }
        let newAnswer = s.filter((dd) => [
          checkRowPlacement(newPuzzleString, row, column, value),
          checkColumnPlacement(newPuzzleString, row, column, value),
          checkRegionPlacement(newPuzzleString, row, column, value)
          ].every((c) => c == true)
        )
        if (newAnswer.length == 1) {
          return newAnswer[0];
        }
        return newAnswer;
      });
      let tempPuzzleString = "";
      newAnswers.forEach((a) => {
        if (Array.isArray(a)) {
          tempPuzzleString = tempPuzzleString + ".";
        } else {
          tempPuzzleString = tempPuzzleString + a;
        }
      });
      newPuzzleString = tempPuzzleString;
      unsolved = false;
      if (newAnswers.every((q) => !(Array.isArray(q)))) {
        unsolved = false;
      }
    }
    console.log(newPuzzleString);
    return newPuzzleString;
  }
}

module.exports = SudokuSolver;