(function(root){

  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Board = SnakeGame.Board = function(size){
    this.grid = this.makeGrid(size);
    this.snake = new SnakeGame.Snake();
    this.setSnake();
    this.mouse = this.spawnMouse();
  }

  Board.prototype.setSnake = function(){
    var that = this;
    this.snake.segments.forEach(function(seg){
      that.grid[seg.pos[1]][seg.pos[0]] = 'S';
    })
  }

  Board.prototype.spawnMouse = function(){
    var mouse = new SnakeGame.Mouse(this.grid.length);

    while(this.grid[mouse.pos[1]][mouse.pos[0]] === "S"){
      mouse.pos = mouse.randomPos(this.grid.length);
    }

    this.grid[mouse.pos[1]][mouse.pos[0]] = 'M';

    return mouse;
  }

  Board.prototype.render = function() {
    this.grid.forEach(function(row) {
      console.log(row);
    })
  }

  Board.prototype.update = function(){

    var lastPos = _.last(this.snake.segments).pos;
    this.grid[lastPos[1]][lastPos[0]] = '.';

    this.snake.move();
    this.snake.offScreen(this.grid.length)

    var firstPos = _.first(this.snake.segments).pos;
    if (this.snake.checkCollision(firstPos))
      alert("YOU LOSE!")

    if (firstPos[0] == this.mouse.pos[0] && firstPos[1] == this.mouse.pos[1]){
      this.snake.grow(lastPos);
      this.mouse = this.spawnMouse();
    }

    this.grid[firstPos[1]][firstPos[0]] = 'S';



  }

  Board.prototype.makeGrid = function(size) {
    grid = []

    for(var i = 0; i < size; i++) {
      grid.push([]);

      for(var j = 0; j < size; j++) {
        grid[i].push(".");
      }
    }

    return grid;
  }

})(this)
