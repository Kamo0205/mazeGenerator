let maze = document.querySelector(".maze");
let context = maze.getContext("2d");

let current;

class Maze {
    constructor(size, row, column) {
        this.size = size;
        this.row = row;
        this.column = column;
        this.grid = [];
        this.stack = [];
    }

    setup() {
        for (let r = 0; r < this.row; r++) {
            let row = [];
            for (let c = 0; c < this.column; c++) {
                row.push(new Cell(r,c,this.grid,this.size));
            }
            this.grid.push(row);
        }
        current = this.grid[0][0];
    }
}

class Cell {
    constructor(rowNum,colNum,parentGrid,parentSize) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.visited = false;
        this.walls = {
            topWall: true,
            rightWall: true,
            bottomWall: true,
            leftWall: true,
        }
    }
}