function Cell(initialState) {
    this.isAlive = initialState;
    this.willBeAlive = false;
}

Cell.prototype.computeNextState = function(aliveNeighborsCount) {
    if(aliveNeighborsCount == 3){
        this.willBeAlive = true;
    } else if(aliveNeighborsCount > 3 || aliveNeighborsCount < 2) {
        this.willBeAlive = false;
    } else {
        this.willBeAlive = this.isAlive;
    }

    return this.willBeAlive;
};

Cell.prototype.nextState = function(){
    this.isAlive = this.willBeAlive;
}

