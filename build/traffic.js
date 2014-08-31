(function() {
  $(function() {
    window.world = new World;
    return setInterval(function() {
      world.update();
      return world.draw();
    }, 1000 / world.fps);
  });

}).call(this);

(function() {
  var World;

  World = (function() {
    function World() {}

    return World;

  })();

}).call(this);
