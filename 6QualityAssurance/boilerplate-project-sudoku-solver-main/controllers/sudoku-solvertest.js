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
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        for (let k = 1; k < 10; k++) {
          let testValue = k;
          let testRow = this.rowLabels[i];
          let testColumn = this.columnLables[j];
          let passed = [
            this.checkRowPlacement(newPuzzleString, testRow, testColumn, testValue),
            this.checkColPlacement(newPuzzleString, testRow, testColumn, testValue),
            this.checkRegionPlacement(newPuzzleString, testRow, testColumn, testValue)
          ].every((d) => d == true);
          
          if (passed) {
            console.log("Input" + newPuzzleString);
            let tempObj = this.checkTargetPlacement(newPuzzleString, testRow, testColumn, testValue);
            let tempPuzzleString = "";
            tempObj.newPuzzleArray.forEach((d, i) => {
              tempPuzzleString = tempPuzzleString + d
            });
            newPuzzleString = tempPuzzleString;
            break;
          }
        }
      }
    }
    
    return newPuzzleString;
  }
}

module.exports = SudokuSolver;