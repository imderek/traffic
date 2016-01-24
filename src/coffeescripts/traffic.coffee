$ ->
  window.world = new World
  update_and_draw_world = ->
    window.world.update()
    window.world.draw()
    requestAnimationFrame update_and_draw_world
    return

  requestAnimationFrame update_and_draw_world
