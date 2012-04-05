function CellGrid(rows, columns) {
    this.cells = new Array(rows);
    var n = 0;
    for(var i = -1; ++i < rows;){
        this.cells[i] = new Array(columns);
        for(var j = -1; ++j < columns; ){
            var cell = new Cell(false);
            cell.n = n++;
            cell.x = i;
            cell.y = j;
            this.cells[i][j] = cell;
        }
    }
}

CellGrid.prototype.aliveNeighborsFor = function(x, y) {
    var self = this,
        neighbors = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

    function isAliveAt(i, j){
        if(i < 0 || i >= self.cells.length || j < 0 || j >= self.cells[0].length){
            return false;
        }
        return self.cells[i][j].isAlive;
    }

    var count = 0;
    for(var i = 0; i < neighbors.length; i++){
        count += (isAliveAt(x+neighbors[i][0],y+neighbors[i][1]))?1:0;
    }

    return count;
};

CellGrid.prototype.eachCell = function(callback){
    var rows = this.cells.length,
        columns = this.cells[0].length,
        x,y;
    for(var i = 0; i < rows * columns; i++){
        x = i%rows; y = Math.floor(i/rows);
        callback.apply(this,[this.cells[x][y],x,y]);
    }
};

CellGrid.prototype.reset = function(){
    this.eachCell(function(cell,x,y){
        cell.isAlive = (Math.random() > 0.5);
    });
};

CellGrid.prototype.prepareStep = function() {
    this.eachCell(function(cell,x,y){
        cell.computeNextState(this.aliveNeighborsFor(x,y));
    });
};

CellGrid.prototype.step = function() {
    this.prepareStep();
    this.eachCell(function(cell,x,y){
        cell.nextState();
    });
};

CellGrid.prototype.aliveCells = function() {
    var alive = [];
    this.eachCell(function(cell){
        cell.isAlive && alive.push(cell);
    });
    return alive;
};

