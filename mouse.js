(function(root){

  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});


  var Mouse = SnakeGame.Mouse = function(size){
    this.pos = this.randomPos(size);
  }

  Mouse.prototype.randomPos = function(size){
    var x = Math.floor(Math.random() * size);
    var y = Math.floor(Math.random() * size);

    return [x, y];
  }




})(this)