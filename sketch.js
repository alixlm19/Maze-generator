var col;
var row;
var scl = 10;

var w;
var h;

var cells;
var currentCell;
var stack = [];
var visited = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    col = floor(width / scl);
    row = floor(height / scl);

    w = floor(width / col);
    h = floor(height / row);

    createCells();
    currentCell = cells[0];
    currentCell.selected = true;
    currentCell.visited = true;
    //frameRate(5);
}

function draw() {
    background(0);

    if (visited < cells.length - 1) {
        let neighbours = getNeighbours(currentCell);
        if (neighbours.length > 0) {
            let nextCell = random(neighbours);
            stack.push(currentCell);
            removeWalls(nextCell);
            currentCell.selected = false;
            currentCell = nextCell;
            currentCell.visited = true;
            currentCell.selected = true;
            visited++;
        } else {
            let cell = stack.pop();
            currentCell.selected = false;
            currentCell = cell;
            currentCell.selected = true;
        }
    }

    for (let cell of cells) {
        cell.show();
    }
}

//Initializes all of the cells
function createCells() {
    cells = []; //Empties the current cell array

    //     row = floor(height/scl);
    // 	col = floor(width/scl);
    //     w = floor(width / col);		//Cell width
    //     h = floor(height / row);	//Cell height

    for (let y = 0; y < row; y++) {
        for (let x = 0; x < col; x++) {
            let cell = new Cell(x * w, y * h, w, h);
            cells.push(cell);
        }
    }
}

function getNeighbours(cell) {
    let neighbours = []; //top, right, bottom, left
    let [i, j] = getCoordinates(cell.x, cell.y);

    if (j - 1 >= 0) neighbours.push(cells[getIndex(i, j - 1)]);
    if (i + 1 < col) neighbours.push(cells[getIndex(i + 1, j)]);
    if (j + 1 < row) neighbours.push(cells[getIndex(i, j + 1)]);
    if (i - 1 >= 0) neighbours.push(cells[getIndex(i - 1, j)]);

    return neighbours.filter((neighbour) => neighbour.visited === false);

    //return neighbours;

}

function removeWalls(cell) {
    if (currentCell.y > cell.y) { //Top-bottom wall
        currentCell.top = false;
        cell.bottom = false;
    } else if (currentCell.x < cell.x) { //Right-left wall
        currentCell.right = false;
        cell.left = false;
    } else if (currentCell.y < cell.y) { //Bottom-top wall
        currentCell.bottom = false;
        cell.top = false;
    } else if (currentCell.x > cell.x) { //Left-right wall
        currentCell.left = false;
        cell.right = false;
    }
}

//Returns the coordinates in the grid of the cell relative
//to its position on the canvas
function getCoordinates(x, y) {
    let i = (x - (x) % w) / w;
    let j = (y - (y) % h) / h;
    return [i, j];
}

//Returns the index stored at the one-dimensional array
//Cells
function getIndex(x, y) {
    return x + y * col;
}