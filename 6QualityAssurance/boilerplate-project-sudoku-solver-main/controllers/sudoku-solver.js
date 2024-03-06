class SudokuSolver {
  constructor() {
    this.rowLabels = "123456789".split("");
    this.rows = Array(9).fill(null).map((d, i) => {
      let row = [];
      for (let j = 0; j < 9; j++) {
        row.push(i + (j * 9));
      }
      return row;
    });
    this.columnLables = "ABCDEFGHI".split("");
    this.columns = Array(9).fill(null).map((d, i) => {
      let column = [];
      for (let j = 0; j < 9; j++) {
        column.push(j + (i * 9));
      }
      return column;
    });
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
    console.log(this.rows);
    console.log(this.columns);
    console.log(this.regions);
  }

  validate(puzzleString) {
    let values = puzzleString.split("");
    return values.length == 81;
  }

  getLocation(newPuzzleString, y, x, input) {
    const yAxis = "ABCDEFGHI".split("").indexOf(y.toUpperCase());
    const xAxis = x - 1;
    console.log(newPuzzleString);
    let current = newPuzzleString.split("");
    let index = (yAxis * 9) + xAxis;
    if (newPuzzleString[index] == /([1-9]|[.])/i) {
      return "occupied";
    }
    current.splice(index, 1, input);
    return {
      current: current,
      xAxis: xAxis,
      yAxis: yAxis,
      index: index
    }
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

  checkRowPlacement(puzzleString, row, column, value) {
    let board = this.getLocation(puzzleString, row, column, value);
    if (board == "occupied") {
      return false;
    }
    let test = board.current.slice(board.yAxis * 9, (board.yAxis * 9) + 9);
    return this.checkPlacement(test);
  }

  checkColPlacement(puzzleString, row, column, value) {
    let board = this.getLocation(puzzleString, row, column, value);
    if (board == "occupied") {
      return false;
    }
    let test = Array(9).fill(null).map((d, i) => board.current[board.xAxis + (9 * i)]);
    return this.checkPlacement(test);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let board = this.getLocation(puzzleString, row, column, value);
    if (board == "occupied") {
      return false;
    }
    let regionSlice = this.regions.filter((d, i) => d.indexOf(board.index) > -1)[0];
    let test = Array(9).fill(null).map((d, i) => board.current[regionSlice[i]]);
    return this.checkPlacement(test);
  }

  solve(puzzleString) {
    this.validate(puzzleString);
    let tempPuzzleString = puzzleString.slice();
    console.log("temp" + tempPuzzleString);
    let puzzleArray = tempPuzzleString.split("");
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        for (let k = 1; k < 10; k++) {
          let a = this.rows[j][0];
          let b = this.columns[i];
          let passed = [
            this.checkRowPlacement(tempPuzzleString, a, b, k),
            this.checkColPlacement(tempPuzzleString, a, b, k),
            this.checkRegionPlacement(tempPuzzleString, a, b, k)
            ].every((d) => d == true);
          
          if (passed) {
            console.log("Input" + tempPuzzleString);
            let board = this.getLocation(tempPuzzleString, a, b, k);
            console.log(board);
            if (board == "occupied") {
              break;
            }
            tempPuzzleString = board.current.forEach((d) => {tempPuzzleString = tempPuzzleString + d});
            break;
          }
        }
      }
    }
    
    return tempPuzzleString;
  }
}

module.exports = SudokuSolver;

