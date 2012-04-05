describe("Grid", function() {
    var cellGrid;

    beforeEach(function() {
        cellGrid = new CellGrid(3,3);
        cellGrid.cells[0][0].isAlive = true;
        cellGrid.cells[0][1].isAlive = true;
        cellGrid.cells[0][2].isAlive = true;
        cellGrid.cells[2][2].isAlive = true;
    });

    it("should have a 9 cells array", function() {
        expect(cellGrid.cells.length).toBe(3);
        expect(cellGrid.cells[2].length).toBe(3);

        expect(cellGrid.cells[2][2]).toBeDefined();
    });

    it("should calculate 0 neighbors for 2,2",function(){
        expect(cellGrid.aliveNeighborsFor(2,2)).toBe(0);
    });

    it("should calculate 1 neighbors for 0,0",function(){
        expect(cellGrid.aliveNeighborsFor(0,0)).toBe(1);
    });

    it("should calculate 3 neighbors for 1,2",function(){
        expect(cellGrid.aliveNeighborsFor(1,2)).toBe(3);
    });

    it("should prepare birth of 1,2",function(){
        cellGrid.prepareStep();
        expect(cellGrid.cells[1][2].willBeAlive).toBeTruthy();
    });

    it("should prepare death of 0,2",function(){
        cellGrid.prepareStep();
        expect(cellGrid.cells[0][2].willBeAlive).toBeFalsy();
    });

    it("should keep state of 1,0",function(){
        cellGrid.prepareStep();
        expect(cellGrid.cells[1][0].willBeAlive).toBeFalsy();
    });

    it("should give birth to 1,2",function(){
        cellGrid.step();
        expect(cellGrid.cells[1][2].isAlive).toBeTruthy();
    });

    it("should kill 0,2",function(){
        cellGrid.step();
        expect(cellGrid.cells[0][2].isAlive).toBeFalsy();
    });

    it("should keep state of 1,0",function(){
        cellGrid.step();
        expect(cellGrid.cells[1][0].isAlive).toBeFalsy();
    });
});

