$ ->
  window.world = new World
  setInterval ->
    world.update()
    world.draw()
  , 1000/world.fps