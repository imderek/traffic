class @Road
  constructor: (x_start = 100, x_end = 650, y_start = 100, y_end = 100) ->
    @active = true
    @cars = []
    @x_start = x_start
    @x_end = x_end
    @y_start = y_start
    @y_end = y_end
    @events()
      
  draw: =>
    world.canvas.lineWidth = 8
    world.canvas.lineCap = "round"
    world.canvas.strokeStyle = "#888"
    world.canvas.beginPath()
    world.canvas.moveTo @x_start, @y_start
    world.canvas.lineTo @x_end, @y_end
    world.canvas.stroke()
      
  events: =>
    # click the canvas to toggle road active status
    $("canvas").on "click", =>
      @active = if @active then false else true