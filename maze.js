let maze = document.querySelector(".maze");
let context = maze.getContext("2d");

let current;

class Maze {
    constructor(size, rows, columns) {
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
    }

    setup() {
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.columns; c++) {
                row.push(new Cell(r,c,this.grid,this.size));
            }
            this.grid.push(row);
        }
        current = this.grid[0][0];
    }

    draw() {
        maze.width = this.size;
        maze.height = this.size;
        maze.style.background = "black";
        current.visited = true;


        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let grid = this.grid;
                grid[r][c].show(this.size,this.rows,this.columns);
            }
        }
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

    checkNeighbours() {
        let grid = this.parentGrid;
        let row = this.rowNum;
        let col = this.colNum;
        let neighbours = [];

        let top = undefined;
        if (row !== 0) top = grid[row - 1][col];
        let bottom = undefined;
        if (row !== (grid.length - 1)) bottom = grid[row + 1][col];
        let left = undefined;
        if (col !== 0) left = grid[row][col - 1];
        let right = undefined;
        if (col !== (grid.length - 1)) right = grid[row][col+1];
        
        if (top && !top.visited) neighbours.push(top);
        if (right && !right.visited) neighbours.push(right);
        if (bottom && !bottom.visited) neighbours.push(bottom);
        if (left && !left.visited) neighbours.push(left);

        if (neighbours.length !== 0) {
            let random = Math.floor(Math.random() * neighbours.length);
        } else {
            return undefined;
        }
    }

    drawTopWall(x,y,size,columns,rows) {
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(x+(size/columns),y);
        context.stroke();
    }

    drawRightWall(x,y,size,columns,rows) {
        context.beginPath();
        context.moveTo(x+(size/columns),y);
        context.lineTo(x+(size/columns),y+(size/rows));
        context.stroke();
    }

    drawBottomWall(x,y,size,columns,rows) {
        context.beginPath();
        context.moveTo(x,y+(size/rows));
        context.lineTo(x+(size/columns),y+(size/rows));
        context.stroke();
    }

    drawLeftWall(x,y,size,columns,rows) {
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(x,y+(size/rows));
        context.stroke();
    }

    show(size,rows,columns) {
        let x = (this.colNum * size) /columns;
        let y = (this.rowNum * size) / rows

        context.strokeStyle = "white";
        context.fillStyle = "black";
        context.limitWidth = 2;

        if (this.walls.topWall) this.drawTopWall(x,y,size,columns,rows);
        if (this.walls.bottomWall) this.drawBottomWall(x,y,size,columns,rows);
        if (this.walls.rightWall) this.drawRightWall(x,y,size,columns,rows);
        if (this.walls.leftWall) this.drawLeftWall(x,y,size,columns,rows);
        if (this.visited) {
            context.fillRect(x+1,y+1,(size/columns)-2,(size/rows)-3);
        }
    }
}

let newMaze = new Maze(500,10,10);
newMaze.setup();
newMaze.draw();