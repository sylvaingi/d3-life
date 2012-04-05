describe("Cell", function() {
  var cell;

      beforeEach(function() {
        cell = new Cell();

        this.addMatchers({
            toBeAlive: function() {
                return this.actual.isAlive;
            },
            toBeDead: function(c){
                return !this.actual.isAlive;
            }
        });

      });

    it("should be dead", function() {
        var cell = new Cell(false);
        expect(cell).toBeDead();
    });

    it("should be dead", function() {
        var cell = new Cell(true);
        expect(cell).toBeAlive();
    });

    it("should become alive", function() {
        cell.willBeAlive = true;
        cell.nextState();
        expect(cell).toBeAlive();
    });

    it("should become dead", function() {
        cell.willBeAlive = false;
        cell.isAlive = true;
        cell.nextState();
        expect(cell).toBeDead();
    });

    it("should stay dead", function() {
        cell.willBeAlive = false;
        cell.nextState();
        expect(cell).toBeDead();
    });

    it("should stay alive", function() {
        cell.willBeAlive = true;
        cell.isAlive = true;
        cell.nextState();
        expect(cell).toBeAlive();
    });

    it("should revive with 3 alive neighbors", function() {
        cell.computeNextState(3);
        expect(cell.willBeAlive).toBeTruthy();
    });

    it("should die with more than 3 alive neighbors", function() {
        cell.isAlive = true;
        cell.computeNextState(4);
        expect(cell.willBeAlive).toBeFalsy();
    });

    it("should die with less than 2 alive neighbors", function() {
        cell.isAlive = true;
        cell.computeNextState(1);
        expect(cell.willBeAlive).toBeFalsy();
    });

    it("should stay alive 2 with alive neighbors", function() {
        cell.isAlive = true;
        cell.computeNextState(2);
        expect(cell.willBeAlive).toBeTruthy();
    });

    it("should stay dead with 2 alive neighbors", function() {
        cell.isAlive = false;
        cell.computeNextState(2);
        expect(cell.willBeAlive).toBeFalsy();
    });

});

