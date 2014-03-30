(function(root) {

  var SnakeGame = root.SnakeGame = (root.SnakeGame || {})

  var Snake = SnakeGame.Snake = function() {
    this.dir = 'W'
    this.segments = [new Coord([5,5]), new Coord([4,5])];
  }

  Snake.DIRS = ['N', 'E', 'S', 'W'];

  Snake.prototype.move = function(){
    var pair = [0,0];

    switch(this.dir){
      case 'N':
        pair[0] += -1;
        break;
      case 'S':
        pair[0] += 1;
        break;
      case 'E':
        pair[1] += -1;
        break;
      case 'W':
        pair[1] += 1;
        break;
    }

    for(var i = this.segments.length - 1; i > 0; i--){
      var x = this.segments[i - 1].pos[0]
      var y = this.segments[i - 1].pos[1]

      this.segments[i].pos = [x, y];
    }
    this.segments[0].plus(pair[0], pair[1])
  }

  Snake.prototype.offScreen = function(size){

    for(var i = 0; i < this.segments.length; i++){
      var x = this.segments[i].pos[0];
      var y = this.segments[i].pos[1];


      if(x >= size){
        this.segments[i].pos[0] -= size;
      } else if (x < 0){
        this.segments[i].pos[0] += size;
      }

      if (y >= size){
        this.segments[i].pos[1] -= size;
      } else if (y < 0) {
        this.segments[i].pos[1] += size;
      }

    }

  }

  Snake.prototype.checkCollision = function(firstPos) {
    for(var i = 1; i < this.segments.length; i++) {
      if (this.segments[i].pos[0] == firstPos[0] && this.segments[i].pos[1] == firstPos[1]) {
        console.log(this.segments);
        console.log("first", firstPos);
        debugger
        return true
      }
    }

    return false
  }

  Snake.prototype.grow = function(lastPos) {
    var segment = new Coord(lastPos);
    this.segments.push(segment);
  }

  Snake.prototype.turn = function(dir){
    this.dir = dir;
  }


  var Coord = SnakeGame.Coord = function(pos) {
    this.pos = pos;
  }

  Coord.prototype.plus = function(x, y) {
    this.pos[0] += y; 1
    this.pos[1] += x; 0
  }

})(this);