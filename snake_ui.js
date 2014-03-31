(function(root){

  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var View = SnakeGame.View = function(el, outter){
    this.$el = el;
    this.$outter = outter;
  }

  View.prototype.start = function(size) {
    this.board = new SnakeGame.Board(size);
    var that = this;
    this.$el.keydown(function(event){
      that.handleKeyEvent(event)
    });

    setInterval(this.step.bind(this), 100);
  }


  View.prototype.step = function() {
    this.board.update();
    //this.board.render();
    this.render();
  }

  View.prototype.render = function() {
    var that = this;
    this.$outter.empty();

    this.board.grid.forEach(function(row){
      var div = $('<div>');
      that.$outter.append(div);

      row.forEach(function(tile){
        var span = $('<span>');
        span.addClass('tile');

        if(tile == 'S'){
          span.addClass('snake');
        }
        if(tile == 'M'){
          span.addClass('mouse');
        }

        div.append(span);
      });
    });
  }


  View.prototype.handleKeyEvent = function(event) {
    var dir = this.board.snake.dir;
    switch(event.keyCode){
      case 87:
        dir = 'N';
        break;
      case 83:
        dir = 'S';
        break;
      case 65:
        dir = 'E';
        break;
      case 68:
        dir = 'W';
        break;
    }

    if (this.validMove(dir))
      this.board.snake.turn(dir);
  }


  View.prototype.validMove = function(dir) {
    var snakeDir = this.board.snake.dir

    if (dir === 'S' && snakeDir === 'N') {
      return false
    } else if (dir === 'N' && snakeDir === 'S') {
        return false
    } else if (dir === 'E' && snakeDir === 'W') {
        return false
    } else if (dir === 'W' && snakeDir === 'E') {
        return false
    }

    return true
  }

})(this)

$(function(){
  var outter = $('.container');
  var doc = $(document)
  var view = new window.SnakeGame.View(doc, outter);
  view.start(20);
})

// 87 - W
// 83 - S
// 65 - A
// 68 - D