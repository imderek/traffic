class @Road
  constructor: (x_start = 100, x_end = 650, y_start = 100, y_end = 100, angle = 0) ->
    @active = true
    @cars = []
    @x_start = x_start
    @x_end = x_end
    @y_start = y_start
    @y_end = y_end
    @id = "#{@x_start}#{@y_start}#{@x_end}#{@y_end}"
    @el = null
    @events()
      
  draw: =>
    world.canvas.lineWidth = 26
    world.canvas.lineCap = "square"
    world.canvas.strokeStyle = "#444"
    world.canvas.beginPath()
    world.canvas.moveTo @x_start, @y_start
    world.canvas.lineTo @x_end, @y_end
    world.canvas.stroke()
      
  events: =>